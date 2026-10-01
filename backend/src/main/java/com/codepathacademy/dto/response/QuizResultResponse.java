package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResultResponse {

    private Long attemptId;
    private Long quizId;
    private Integer score;
    private Integer totalQuestions;
    private Double percentage;
    private Boolean passed;
    private Integer xpEarned;
    private String adaptiveRecommendation;
    private List<QuestionResultItem> questions;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuestionResultItem {
        private Long questionId;
        private String prompt;
        private String codeSnippet;
        private List<String> submittedAnswers;
        private List<String> correctAnswers;
        private Boolean isCorrect;
        private String explanation;
        private Map<String, String> wrongAnswersExplanation;
        private String relatedTopic;
    }
}
