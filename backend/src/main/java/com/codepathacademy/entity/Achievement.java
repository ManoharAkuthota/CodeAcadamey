package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "achievements", indexes = {
    @Index(name = "idx_badge_key", columnList = "badgeKey", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String badgeKey;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 255)
    private String description;

    @Column(length = 100)
    private String icon;

    @Builder.Default
    private Integer xpReward = 100;

    @Column(length = 50)
    private String category;
}
