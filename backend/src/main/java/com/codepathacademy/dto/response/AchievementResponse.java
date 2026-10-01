package com.codepathacademy.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchievementResponse {
    private Long id;
    private String badgeKey;
    private String title;
    private String description;
    private String icon;
    private Integer xpReward;
    private String category;
    private boolean isUnlocked;
    private LocalDateTime earnedAt;
}
