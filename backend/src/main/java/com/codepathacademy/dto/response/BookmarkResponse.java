package com.codepathacademy.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookmarkResponse {
    private Long id;
    private String itemType;
    private Long itemId;
    private String title;
    private String pathUrl;
    private LocalDateTime createdAt;
}
