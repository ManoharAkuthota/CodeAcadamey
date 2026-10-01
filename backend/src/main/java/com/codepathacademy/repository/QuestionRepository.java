package com.codepathacademy.repository;

import com.codepathacademy.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizIdOrderByDisplayOrderAsc(Long quizId);
    List<Question> findByPromptContainingIgnoreCase(String prompt);
}
