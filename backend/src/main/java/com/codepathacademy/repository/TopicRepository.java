package com.codepathacademy.repository;

import com.codepathacademy.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByModuleIdAndIsPublishedTrueOrderByTopicOrderAsc(Long moduleId);
    Optional<Topic> findBySlug(String slug);
    List<Topic> findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCase(String title, String summary);
}
