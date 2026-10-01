package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_achievements", uniqueConstraints = {
    @UniqueConstraint(name = "uk_user_achievement", columnNames = {"user_id", "achievement_id"})
}, indexes = {
    @Index(name = "idx_ua_user", columnList = "user_id"),
    @Index(name = "idx_ua_achievement", columnList = "achievement_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAchievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id", nullable = false)
    private Achievement achievement;

    @CreationTimestamp
    private LocalDateTime earnedAt;
}
