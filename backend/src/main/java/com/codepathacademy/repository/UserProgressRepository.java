package com.codepathacademy.repository;

import com.codepathacademy.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndTopicId(Long userId, Long topicId);
    List<UserProgress> findByUserId(Long userId);
    long countByUserIdAndIsCompletedTrue(Long userId);

    @Query("SELECT up.topic.id FROM UserProgress up WHERE up.user.id = :userId AND up.isCompleted = true")
    List<Long> findCompletedTopicIdsByUserId(Long userId);

    @Query("SELECT COUNT(up) FROM UserProgress up WHERE up.user.id = :userId AND up.topic.module.course.id = :courseId AND up.isCompleted = true")
    long countCompletedTopicsByUserIdAndCourseId(Long userId, Long courseId);
}
