package com.codepathacademy.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseSummaryResponse {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String level;
    private Integer estimatedHours;
    private String thumbnail;
    private String languageName;
    private String languageSlug;
    private String frameworkName;
    private String frameworkSlug;
    private Integer moduleCount;
    private Integer topicCount;
    private Double progressPercentage;
}
