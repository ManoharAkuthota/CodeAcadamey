package com.codepathacademy.repository;

import com.codepathacademy.entity.CodingProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingProblemRepository extends JpaRepository<CodingProblem, Long> {
    Optional<CodingProblem> findBySlug(String slug);
    List<CodingProblem> findByIsPublishedTrue();
    List<CodingProblem> findByDifficultyAndIsPublishedTrue(String difficulty);
    List<CodingProblem> findByCategoryAndIsPublishedTrue(String category);
    List<CodingProblem> findByLanguageIdAndIsPublishedTrue(Long languageId);
    List<CodingProblem> findByTitleContainingIgnoreCase(String title);
}
