package com.codepathacademy.repository;

import com.codepathacademy.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByTopicIdAndIsPublishedTrue(Long topicId);
    Optional<Quiz> findByModuleIdAndIsPublishedTrue(Long moduleId);
    List<Quiz> findByIsPublishedTrue();
}
