package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicResponse {
    private Long id;
    private Long moduleId;
    private String title;
    private String slug;
    private String summary;
    private Integer topicOrder;
    private Long prerequisiteTopicId;
    private String prerequisiteTopicTitle;
    private boolean isLocked;
    private boolean isCompleted;
    private Long quizId;
    private Long lessonId;
}
