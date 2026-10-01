package com.codepathacademy.repository;

import com.codepathacademy.entity.Framework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FrameworkRepository extends JpaRepository<Framework, Long> {
    Optional<Framework> findBySlug(String slug);
    List<Framework> findByIsPublishedTrueOrderByDisplayOrderAsc();
    List<Framework> findByCategoryIgnoreCaseAndIsPublishedTrue(String category);
}
