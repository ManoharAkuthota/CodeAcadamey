package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingProblemResponse {
    private Long id;
    private String title;
    private String slug;
    private Long languageId;
    private String languageName;
    private String difficulty;
    private String category;
    private String description;
    private String constraints;
    private String inputFormat;
    private String outputFormat;
    private String sampleInput;
    private String sampleOutput;
    private String starterCode;
    private String hints;
    private Integer xpReward;
    private boolean isSolved;
    private List<TestCaseItem> visibleTestCases;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TestCaseItem {
        private String input;
        private String expectedOutput;
    }
}
