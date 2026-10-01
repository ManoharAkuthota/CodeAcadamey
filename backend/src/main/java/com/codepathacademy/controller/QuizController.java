package com.codepathacademy.controller;

import com.codepathacademy.dto.request.QuizSubmitRequest;
import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.QuizResponse;
import com.codepathacademy.dto.response.QuizResultResponse;
import com.codepathacademy.repository.QuizRepository;
import com.codepathacademy.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
@Tag(name = "Quizzes", description = "Interactive knowledge test, scoring, and adaptive guidance endpoints")
public class QuizController {

    private final QuizService quizService;
    private final QuizRepository quizRepository;

    @GetMapping("/{id}")
    @Operation(summary = "Get quiz questions and configuration by quiz ID")
    public ResponseEntity<ApiResponse<QuizResponse>> getQuizById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        QuizResponse quiz = quizService.getQuizById(id, username);
        return ResponseEntity.ok(ApiResponse.ok(quiz));
    }

    @GetMapping("/topic/{topicId}")
    @Operation(summary = "Get quiz associated with a topic ID")
    public ResponseEntity<ApiResponse<QuizResponse>> getQuizByTopicId(
            @PathVariable Long topicId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        Long quizId = quizRepository.findByTopicIdAndIsPublishedTrue(topicId)
                .map(q -> q.getId())
                .orElse(null);

        if (quizId == null) {
            return ResponseEntity.ok(ApiResponse.ok("No quiz found for this topic", null));
        }

        QuizResponse quiz = quizService.getQuizById(quizId, username);
        return ResponseEntity.ok(ApiResponse.ok(quiz));
    }

    @PostMapping("/{id}/submit")
    @Operation(summary = "Submit quiz answers, get score breakdown and adaptive recommendations")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submitQuiz(
            @PathVariable Long id,
            @RequestBody QuizSubmitRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        QuizResultResponse result = quizService.submitQuiz(id, request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Quiz submitted successfully", result));
    }
}
