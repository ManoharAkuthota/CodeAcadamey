package com.codepathacademy.service;

import com.codepathacademy.dto.response.LessonResponse;
import com.codepathacademy.entity.*;
import com.codepathacademy.entity.Module;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final TopicRepository topicRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;
    private final BookmarkRepository bookmarkRepository;
    private final GamificationService gamificationService;

    @Transactional(readOnly = true)
    public LessonResponse getLessonById(Long lessonId, String username) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));
        return buildLessonResponse(lesson, username);
    }

    @Transactional(readOnly = true)
    public LessonResponse getLessonByTopicId(Long topicId, String username) {
        Lesson lesson = lessonRepository.findFirstByTopicIdOrderByLessonOrderAsc(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("No lesson found for topic id: " + topicId));
        return buildLessonResponse(lesson, username);
    }

    @Transactional
    public boolean markTopicComplete(Long topicId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found: " + topicId));

        boolean alreadyCompleted = userProgressRepository.findByUserIdAndTopicId(user.getId(), topicId)
                .map(UserProgress::getIsCompleted)
                .orElse(false);

        if (!alreadyCompleted) {
            UserProgress progress = userProgressRepository.findByUserIdAndTopicId(user.getId(), topicId)
                    .orElse(UserProgress.builder()
                            .user(user)
                            .topic(topic)
                            .build());

            progress.setIsCompleted(true);
            progress.setCompletedAt(LocalDateTime.now());
            userProgressRepository.save(progress);

            // Award XP (+10 XP)
            gamificationService.addXp(user, 10, "LESSON_COMPLETED", "Completed topic: " + topic.getTitle());

            // Check badges
            long totalCompleted = userProgressRepository.countByUserIdAndIsCompletedTrue(user.getId());
            if (totalCompleted >= 1) {
                gamificationService.checkAndUnlockAchievement(user, "FIRST_LESSON");
            }

            // Language specific badge checks
            if (topic.getModule().getCourse().getLanguage() != null) {
                String langSlug = topic.getModule().getCourse().getLanguage().getSlug();
                if ("java".equals(langSlug) && totalCompleted >= 3) {
                    gamificationService.checkAndUnlockAchievement(user, "JAVA_BEGINNER");
                } else if ("python".equals(langSlug) && totalCompleted >= 3) {
                    gamificationService.checkAndUnlockAchievement(user, "PYTHON_EXPLORER");
                }
            }
            return true;
        }

        return false;
    }

    private LessonResponse buildLessonResponse(Lesson lesson, String username) {
        Topic topic = lesson.getTopic();
        Module module = topic.getModule();
        Course course = module.getCourse();

        boolean isCompleted = false;
        boolean isBookmarked = false;

        if (username != null) {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                isCompleted = userProgressRepository.findByUserIdAndTopicId(user.getId(), topic.getId())
                        .map(UserProgress::getIsCompleted)
                        .orElse(false);
                isBookmarked = bookmarkRepository.existsByUserIdAndItemTypeAndItemId(user.getId(), "LESSON", lesson.getId());
            }
        }

        Long quizId = quizRepository.findByTopicIdAndIsPublishedTrue(topic.getId())
                .map(Quiz::getId).orElse(null);

        // Find next and prev topic
        List<Topic> moduleTopics = topicRepository.findByModuleIdAndIsPublishedTrueOrderByTopicOrderAsc(module.getId());
        Long prevTopicId = null;
        Long nextTopicId = null;
        for (int i = 0; i < moduleTopics.size(); i++) {
            if (moduleTopics.get(i).getId().equals(topic.getId())) {
                if (i > 0) prevTopicId = moduleTopics.get(i - 1).getId();
                if (i + 1 < moduleTopics.size()) nextTopicId = moduleTopics.get(i + 1).getId();
                break;
            }
        }

        return LessonResponse.builder()
                .id(lesson.getId())
                .topicId(topic.getId())
                .topicTitle(topic.getTitle())
                .moduleId(module.getId())
                .moduleTitle(module.getTitle())
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .title(lesson.getTitle())
                .contentMarkdown(lesson.getContentMarkdown())
                .codeSnippet(lesson.getCodeSnippet())
                .codeLanguage(lesson.getCodeLanguage())
                .codeExplanationJson(lesson.getCodeExplanationJson())
                .howItWorksJson(lesson.getHowItWorksJson())
                .realWorldExample(lesson.getRealWorldExample())
                .commonMistakes(lesson.getCommonMistakes())
                .bestPractices(lesson.getBestPractices())
                .practiceExercise(lesson.getPracticeExercise())
                .isCompleted(isCompleted)
                .isBookmarked(isBookmarked)
                .quizId(quizId)
                .prevTopicId(prevTopicId)
                .nextTopicId(nextTopicId)
                .build();
    }
}
