package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String contentMarkdown;

    @Column(columnDefinition = "LONGTEXT")
    private String codeSnippet;

    @Column(length = 30)
    private String codeLanguage;

    @Column(columnDefinition = "LONGTEXT")
    private String codeExplanationJson;

    @Column(columnDefinition = "LONGTEXT")
    private String howItWorksJson;

    @Column(columnDefinition = "TEXT")
    private String realWorldExample;

    @Column(columnDefinition = "TEXT")
    private String commonMistakes;

    @Column(columnDefinition = "TEXT")
    private String bestPractices;

    @Column(columnDefinition = "TEXT")
    private String practiceExercise;

    @Builder.Default
    private Integer lessonOrder = 1;
}
