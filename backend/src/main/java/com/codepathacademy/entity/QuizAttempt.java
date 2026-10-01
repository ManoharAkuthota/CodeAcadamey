package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts", indexes = {
    @Index(name = "idx_qa_user", columnList = "user_id"),
    @Index(name = "idx_qa_quiz", columnList = "quiz_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    private Integer score;

    private Integer totalQuestions;

    private Double percentage;

    private Boolean passed;

    @Column(columnDefinition = "TEXT")
    private String adaptiveRecommendation;

    @Column(columnDefinition = "LONGTEXT")
    private String submittedAnswersJson;

    @CreationTimestamp
    private LocalDateTime attemptedAt;
}
