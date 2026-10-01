package com.codepathacademy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookmarkRequest {
    @NotBlank(message = "Item type is required")
    private String itemType; // LESSON, TOPIC, QUESTION, PROBLEM

    @NotNull(message = "Item id is required")
    private Long itemId;

    @NotBlank(message = "Title is required")
    private String title;

    private String pathUrl;
}
