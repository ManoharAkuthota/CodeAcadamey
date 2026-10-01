package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResponse {
    private Long id;
    private Long topicId;
    private String topicTitle;
    private Long moduleId;
    private String title;
    private String description;
    private String difficulty;
    private Integer passingScore;
    private Integer timeLimitMinutes;
    private Integer questionCount;
    private List<QuestionResponse> questions;
    private Integer previousBestScore;
}
