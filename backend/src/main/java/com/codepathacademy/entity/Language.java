package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "languages", indexes = {
    @Index(name = "idx_lang_slug", columnList = "slug", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String whyLearn;

    @Column(length = 30)
    private String difficulty;

    @Column(length = 200)
    private String prerequisites;

    @Column(length = 100)
    private String icon;

    @Column(length = 30)
    private String color;

    private Integer displayOrder;

    @Builder.Default
    private Boolean isPublished = true;
}
