package com.codepathacademy.repository;

import com.codepathacademy.entity.CodingSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingSubmissionRepository extends JpaRepository<CodingSubmission, Long> {
    List<CodingSubmission> findByUserIdOrderBySubmittedAtDesc(Long userId);
    List<CodingSubmission> findByUserIdAndProblemIdOrderBySubmittedAtDesc(Long userId, Long problemId);
    long countByUserIdAndStatus(Long userId, String status);
}
