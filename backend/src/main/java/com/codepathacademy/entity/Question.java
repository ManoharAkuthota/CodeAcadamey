package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private QuestionType questionType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Column(columnDefinition = "LONGTEXT")
    private String codeSnippet;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String optionsJson; // JSON array of options

    @Column(nullable = false, columnDefinition = "TEXT")
    private String correctAnswersJson; // JSON array of correct options or indices

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String wrongAnswersExplanationJson; // JSON explaining why wrong options are incorrect

    @Column(length = 150)
    private String relatedTopic;

    @Builder.Default
    private Integer displayOrder = 1;
}
