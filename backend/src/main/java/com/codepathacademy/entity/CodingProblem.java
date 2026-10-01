package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coding_problems", indexes = {
    @Index(name = "idx_problem_slug", columnList = "slug", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "language_id")
    private Language language;

    @Column(length = 30)
    @Builder.Default
    private String difficulty = "EASY"; // EASY, MEDIUM, HARD

    @Column(length = 50)
    private String category; // Beginner, Intermediate, Advanced

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String constraints;

    @Column(columnDefinition = "TEXT")
    private String inputFormat;

    @Column(columnDefinition = "TEXT")
    private String outputFormat;

    @Column(columnDefinition = "TEXT")
    private String sampleInput;

    @Column(columnDefinition = "TEXT")
    private String sampleOutput;

    @Column(columnDefinition = "LONGTEXT")
    private String starterCode;

    @Column(columnDefinition = "LONGTEXT")
    private String testCasesJson;

    @Column(columnDefinition = "TEXT")
    private String hints;

    @Builder.Default
    private Integer xpReward = 50;

    @Builder.Default
    private Boolean isPublished = true;
}
