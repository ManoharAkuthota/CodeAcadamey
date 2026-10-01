package com.codepathacademy.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteResponse {
    private Long id;
    private Long topicId;
    private String topicTitle;
    private String title;
    private String contentMarkdown;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
