package com.codepathacademy.repository;

import com.codepathacademy.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findBySlug(String slug);
    List<Course> findByIsPublishedTrueOrderByDisplayOrderAsc();
    List<Course> findByLanguageIdAndIsPublishedTrue(Long languageId);
    List<Course> findByFrameworkIdAndIsPublishedTrue(Long frameworkId);
    List<Course> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}
