package com.codepathacademy.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Slug is required")
    private String slug;

    private Long languageId;
    private Long frameworkId;
    private String description;
    private String level;
    private Integer estimatedHours;
    private String thumbnail;
    private Integer displayOrder;
    private Boolean isPublished;
}
