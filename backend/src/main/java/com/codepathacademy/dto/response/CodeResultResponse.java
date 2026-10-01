package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeResultResponse {
    private String status; // ACCEPTED, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, RUNTIME_ERROR
    private Integer passedCount;
    private Integer totalCount;
    private Long executionTimeMs;
    private Integer xpEarned;
    private String message;
    private List<TestCaseResult> testCaseResults;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TestCaseResult {
        private Integer caseNumber;
        private String input;
        private String expectedOutput;
        private String actualOutput;
        private boolean passed;
        private String errorMessage;
    }
}
