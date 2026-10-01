package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDetailResponse {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String level;
    private Integer estimatedHours;
    private String thumbnail;
    private Long languageId;
    private String languageName;
    private String languageSlug;
    private Long frameworkId;
    private String frameworkName;
    private String frameworkSlug;
    private List<ModuleResponse> modules;
    private Double progressPercentage;
    private Long totalTopics;
    private Long completedTopics;
}
