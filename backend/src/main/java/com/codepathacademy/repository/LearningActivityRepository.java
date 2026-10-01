package com.codepathacademy.repository;

import com.codepathacademy.entity.LearningActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LearningActivityRepository extends JpaRepository<LearningActivity, Long> {
    List<LearningActivity> findByUserIdOrderByActivityDateDesc(Long userId);
    List<LearningActivity> findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(Long userId, LocalDate startDate, LocalDate endDate);
}
