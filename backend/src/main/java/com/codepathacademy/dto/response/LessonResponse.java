package com.codepathacademy.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonResponse {
    private Long id;
    private Long topicId;
    private String topicTitle;
    private Long moduleId;
    private String moduleTitle;
    private Long courseId;
    private String courseTitle;
    private String title;
    private String contentMarkdown;
    private String codeSnippet;
    private String codeLanguage;
    private String codeExplanationJson;
    private String howItWorksJson;
    private String realWorldExample;
    private String commonMistakes;
    private String bestPractices;
    private String practiceExercise;
    private boolean isCompleted;
    private boolean isBookmarked;
    private Long quizId;
    private Long nextTopicId;
    private Long prevTopicId;
}
