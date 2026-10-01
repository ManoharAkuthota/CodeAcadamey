package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_activities", indexes = {
    @Index(name = "idx_la_user_date", columnList = "user_id, activityDate")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 50)
    private String activityType;

    @Column(length = 255)
    private String description;

    @Builder.Default
    private Integer xpEarned = 10;

    private LocalDate activityDate;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
