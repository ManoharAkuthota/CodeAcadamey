package com.codepathacademy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookmarks", indexes = {
    @Index(name = "idx_bm_user", columnList = "user_id"),
    @Index(name = "idx_bm_item", columnList = "itemType, itemId")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 30)
    private String itemType; // LESSON, TOPIC, QUESTION, PROBLEM

    @Column(nullable = false)
    private Long itemId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 255)
    private String pathUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
