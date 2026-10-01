package com.codepathacademy.repository;

import com.codepathacademy.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);
    List<QuizAttempt> findByUserIdAndQuizIdOrderByAttemptedAtDesc(Long userId, Long quizId);
    Optional<QuizAttempt> findFirstByUserIdAndQuizIdOrderByScoreDesc(Long userId, Long quizId);

    @Query("SELECT AVG(qa.percentage) FROM QuizAttempt qa WHERE qa.user.id = :userId")
    Double findAverageScoreByUserId(Long userId);

    long countByUserIdAndPassedTrue(Long userId);
}
