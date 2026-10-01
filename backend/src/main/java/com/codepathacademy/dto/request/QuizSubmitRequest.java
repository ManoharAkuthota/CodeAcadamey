package com.codepathacademy.dto.request;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSubmitRequest {
    // Map of questionId to list of submitted answer strings/indices
    private Map<Long, List<String>> answers;
}
