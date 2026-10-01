package com.codepathacademy.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LanguageResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String whyLearn;
    private String difficulty;
    private String prerequisites;
    private String icon;
    private String color;
    private Integer displayOrder;
    private Long courseCount;
    private Double userProgressPercentage;
}
