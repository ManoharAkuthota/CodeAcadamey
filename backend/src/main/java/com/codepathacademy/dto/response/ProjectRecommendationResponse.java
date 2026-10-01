package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRecommendationResponse {
    private Long id;
    private String title;
    private String tier; // BEGINNER, INTERMEDIATE, ADVANCED
    private String description;
    private List<String> requiredSkills;
    private String difficulty;
    private Integer estimatedHours;
    private List<String> features;
    private List<String> techStack;
    private String architectureSummary;
    private boolean isRecommendedForUser;
}
