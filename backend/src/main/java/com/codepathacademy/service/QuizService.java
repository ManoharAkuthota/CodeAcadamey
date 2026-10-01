package com.codepathacademy.service;

import com.codepathacademy.dto.request.QuizSubmitRequest;
import com.codepathacademy.dto.response.QuestionResponse;
import com.codepathacademy.dto.response.QuizResponse;
import com.codepathacademy.dto.response.QuizResultResponse;
import com.codepathacademy.entity.*;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private static final Logger logger = LoggerFactory.getLogger(QuizService.class);

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public QuizResponse getQuizById(Long quizId, String username) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        Integer bestScore = null;
        if (username != null) {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                bestScore = quizAttemptRepository.findFirstByUserIdAndQuizIdOrderByScoreDesc(user.getId(), quiz.getId())
                        .map(QuizAttempt::getScore)
                        .orElse(null);
            }
        }

        List<QuestionResponse> questions = quiz.getQuestions().stream()
                .map(q -> QuestionResponse.builder()
                        .id(q.getId())
                        .quizId(quiz.getId())
                        .questionType(q.getQuestionType())
                        .prompt(q.getPrompt())
                        .codeSnippet(q.getCodeSnippet())
                        .options(parseJsonList(q.getOptionsJson()))
                        .relatedTopic(q.getRelatedTopic())
                        .displayOrder(q.getDisplayOrder())
                        .build())
                .collect(Collectors.toList());

        return QuizResponse.builder()
                .id(quiz.getId())
                .topicId(quiz.getTopic() != null ? quiz.getTopic().getId() : null)
                .topicTitle(quiz.getTopic() != null ? quiz.getTopic().getTitle() : null)
                .moduleId(quiz.getModule() != null ? quiz.getModule().getId() : null)
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .difficulty(quiz.getDifficulty())
                .passingScore(quiz.getPassingScore())
                .timeLimitMinutes(quiz.getTimeLimitMinutes())
                .questionCount(questions.size())
                .questions(questions)
                .previousBestScore(bestScore)
                .build();
    }

    @Transactional
    public QuizResultResponse submitQuiz(Long quizId, QuizSubmitRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        List<Question> questions = quiz.getQuestions();
        int totalQuestions = questions.size();
        int correctCount = 0;
        List<QuizResultResponse.QuestionResultItem> itemResults = new ArrayList<>();
        List<String> weakTopics = new ArrayList<>();

        Map<Long, List<String>> userAnswers = request.getAnswers() != null ? request.getAnswers() : Collections.emptyMap();

        for (Question q : questions) {
            List<String> submitted = userAnswers.getOrDefault(q.getId(), Collections.emptyList());
            List<String> correct = parseJsonList(q.getCorrectAnswersJson());
            Map<String, String> wrongExp = parseJsonMap(q.getWrongAnswersExplanationJson());

            // Normalize comparison (trim, lowercase)
            Set<String> subSet = submitted.stream().map(s -> s.trim().toLowerCase()).collect(Collectors.toSet());
            Set<String> corSet = correct.stream().map(s -> s.trim().toLowerCase()).collect(Collectors.toSet());

            boolean isCorrect = !subSet.isEmpty() && subSet.equals(corSet);
            if (isCorrect) {
                correctCount++;
            } else if (q.getRelatedTopic() != null && !weakTopics.contains(q.getRelatedTopic())) {
                weakTopics.add(q.getRelatedTopic());
            }

            itemResults.add(QuizResultResponse.QuestionResultItem.builder()
                    .questionId(q.getId())
                    .prompt(q.getPrompt())
                    .codeSnippet(q.getCodeSnippet())
                    .submittedAnswers(submitted)
                    .correctAnswers(correct)
                    .isCorrect(isCorrect)
                    .explanation(q.getExplanation())
                    .wrongAnswersExplanation(wrongExp)
                    .relatedTopic(q.getRelatedTopic())
                    .build());
        }

        double percentage = totalQuestions > 0 ? ((double) correctCount / totalQuestions) * 100.0 : 0.0;
        boolean passed = percentage >= (quiz.getPassingScore() != null ? quiz.getPassingScore() : 70);

        // Adaptive recommendation
        String recommendation;
        if (!passed) {
            if (!weakTopics.isEmpty()) {
                recommendation = "You scored " + Math.round(percentage) + "%. You may want to revise "
                        + String.join(", ", weakTopics) + " before attempting again.";
            } else {
                recommendation = "You scored " + Math.round(percentage) + "%. Review the concepts and give it another try!";
            }
        } else {
            recommendation = "Great job! You scored " + Math.round(percentage) + "% and demonstrated strong mastery. Ready for the next topic!";
        }

        // Gamification XP
        int xpEarned = 20; // 20 XP for attempt
        if (passed) {
            xpEarned += 30; // +30 XP bonus for passing
        }
        gamificationService.addXp(user, xpEarned, "QUIZ_SUBMITTED", "Completed quiz: " + quiz.getTitle() + " (" + Math.round(percentage) + "%)");

        // Badges
        gamificationService.checkAndUnlockAchievement(user, "FIRST_QUIZ");
        if (correctCount == totalQuestions && totalQuestions >= 3) {
            gamificationService.checkAndUnlockAchievement(user, "QUIZ_MASTER");
        }

        // Save attempt
        QuizAttempt attempt = QuizAttempt.builder()
                .user(user)
                .quiz(quiz)
                .score(correctCount)
                .totalQuestions(totalQuestions)
                .percentage(Math.round(percentage * 10.0) / 10.0)
                .passed(passed)
                .adaptiveRecommendation(recommendation)
                .submittedAnswersJson(serializeJson(userAnswers))
                .build();
        attempt = quizAttemptRepository.save(attempt);

        return QuizResultResponse.builder()
                .attemptId(attempt.getId())
                .quizId(quiz.getId())
                .score(correctCount)
                .totalQuestions(totalQuestions)
                .percentage(Math.round(percentage * 10.0) / 10.0)
                .passed(passed)
                .xpEarned(xpEarned)
                .adaptiveRecommendation(recommendation)
                .questions(itemResults)
                .build();
    }

    private List<String> parseJsonList(String json) {
        if (json == null || json.isBlank()) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            logger.warn("Could not parse JSON list: {}", json);
            return Collections.emptyList();
        }
    }

    private Map<String, String> parseJsonMap(String json) {
        if (json == null || json.isBlank()) return Collections.emptyMap();
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, String>>() {});
        } catch (Exception e) {
            logger.warn("Could not parse JSON map: {}", json);
            return Collections.emptyMap();
        }
    }

    private String serializeJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "{}";
        }
    }
}
