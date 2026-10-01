package com.codepathacademy.dto.response;

import com.codepathacademy.entity.Role;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private Role role;
    private Integer xp;
    private String level;
    private Integer streakDays;
    private Double learningHours;
    private LocalDate lastActiveDate;
    private LocalDateTime createdAt;
}
