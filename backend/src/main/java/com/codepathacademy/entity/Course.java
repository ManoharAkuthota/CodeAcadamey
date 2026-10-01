package com.codepathacademy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses", indexes = {
    @Index(name = "idx_course_slug", columnList = "slug", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "framework_id")
    private Framework framework;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String level;

    private Integer estimatedHours;

    @Column(length = 255)
    private String thumbnail;

    private Integer displayOrder;

    @Builder.Default
    private Boolean isPublished = true;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("moduleOrder ASC")
    @Builder.Default
    @JsonIgnore
    private List<Module> modules = new ArrayList<>();
}
