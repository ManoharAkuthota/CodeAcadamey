package com.codepathacademy.repository;

import com.codepathacademy.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByTopicIdOrderByLessonOrderAsc(Long topicId);
    Optional<Lesson> findFirstByTopicIdOrderByLessonOrderAsc(Long topicId);
    List<Lesson> findByTitleContainingIgnoreCase(String title);
}
