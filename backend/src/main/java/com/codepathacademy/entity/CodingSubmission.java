package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "coding_submissions", indexes = {
    @Index(name = "idx_cs_user", columnList = "user_id"),
    @Index(name = "idx_cs_problem", columnList = "problem_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private CodingProblem problem;

    @Column(columnDefinition = "LONGTEXT")
    private String code;

    @Column(length = 30)
    private String language;

    @Column(length = 30)
    private String status; // ACCEPTED, WRONG_ANSWER, RUNTIME_ERROR, TIME_LIMIT_EXCEEDED

    private Integer passedTestCases;

    private Integer totalTestCases;

    private Long executionTimeMs;

    @Column(columnDefinition = "LONGTEXT")
    private String outputDetailsJson;

    @CreationTimestamp
    private LocalDateTime submittedAt;
}
