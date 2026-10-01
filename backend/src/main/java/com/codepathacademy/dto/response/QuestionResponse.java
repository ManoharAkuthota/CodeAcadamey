package com.codepathacademy.dto.response;

import com.codepathacademy.entity.QuestionType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponse {
    private Long id;
    private Long quizId;
    private QuestionType questionType;
    private String prompt;
    private String codeSnippet;
    private List<String> options;
    private String relatedTopic;
    private Integer displayOrder;
}
