package com.codepathacademy.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteRequest {
    private Long topicId;

    @NotBlank(message = "Note title is required")
    private String title;

    @NotBlank(message = "Note content is required")
    private String contentMarkdown;
}
