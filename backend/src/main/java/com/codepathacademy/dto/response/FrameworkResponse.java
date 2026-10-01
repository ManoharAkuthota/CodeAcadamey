package com.codepathacademy.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FrameworkResponse {
    private Long id;
    private String name;
    private String slug;
    private String category;
    private String description;
    private String whyUseIt;
    private String prerequisites;
    private String architecture;
    private String coreConcepts;
    private String icon;
    private String color;
    private Integer displayOrder;
    private Long courseCount;
}
