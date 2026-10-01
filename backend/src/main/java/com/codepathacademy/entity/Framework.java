package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "frameworks", indexes = {
    @Index(name = "idx_framework_slug", columnList = "slug", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Framework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 50)
    private String category; // Java, Python, JavaScript, DevOps

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String whyUseIt;

    @Column(length = 255)
    private String prerequisites;

    @Column(columnDefinition = "TEXT")
    private String architecture;

    @Column(columnDefinition = "TEXT")
    private String coreConcepts;

    @Column(length = 100)
    private String icon;

    @Column(length = 30)
    private String color;

    private Integer displayOrder;

    @Builder.Default
    private Boolean isPublished = true;
}
