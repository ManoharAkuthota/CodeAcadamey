package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.InterviewQuestionResponse;
import com.codepathacademy.service.InterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
@Tag(name = "Interview Preparation", description = "Curated technical interview questions by language and skill tier")
public class InterviewController {

    private final InterviewService interviewService;

    @GetMapping
    @Operation(summary = "Get interview questions filtered by category and level")
    public ResponseEntity<ApiResponse<List<InterviewQuestionResponse>>> getInterviewQuestions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String level) {
        List<InterviewQuestionResponse> list = interviewService.getInterviewQuestions(category, level);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
