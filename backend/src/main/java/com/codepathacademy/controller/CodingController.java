package com.codepathacademy.controller;

import com.codepathacademy.dto.request.CodeSubmitRequest;
import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.CodeResultResponse;
import com.codepathacademy.dto.response.CodingProblemResponse;
import com.codepathacademy.service.CodingExecutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
@Tag(name = "Coding Practice", description = "Coding problems, test cases, and safe execution runner endpoints")
public class CodingController {

    private final CodingExecutionService codingExecutionService;

    @GetMapping
    @Operation(summary = "Get coding problems with optional difficulty or category filter")
    public ResponseEntity<ApiResponse<List<CodingProblemResponse>>> getAllProblems(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String category,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        List<CodingProblemResponse> list = codingExecutionService.getAllProblems(difficulty, category, username);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get coding problem by ID with starter code and visible test cases")
    public ResponseEntity<ApiResponse<CodingProblemResponse>> getProblemById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        CodingProblemResponse problem = codingExecutionService.getProblemById(id, username);
        return ResponseEntity.ok(ApiResponse.ok(problem));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get coding problem by slug")
    public ResponseEntity<ApiResponse<CodingProblemResponse>> getProblemBySlug(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        CodingProblemResponse problem = codingExecutionService.getProblemBySlug(slug, username);
        return ResponseEntity.ok(ApiResponse.ok(problem));
    }

    @PostMapping("/{id}/submit")
    @Operation(summary = "Submit code solution against all test cases and earn XP")
    public ResponseEntity<ApiResponse<CodeResultResponse>> submitCode(
            @PathVariable Long id,
            @Valid @RequestBody CodeSubmitRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        CodeResultResponse result = codingExecutionService.executeCode(id, request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Code evaluated successfully", result));
    }

    @PostMapping("/{id}/run")
    @Operation(summary = "Run code solution against sample visible test cases")
    public ResponseEntity<ApiResponse<CodeResultResponse>> runCode(
            @PathVariable Long id,
            @Valid @RequestBody CodeSubmitRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        CodeResultResponse result = codingExecutionService.executeCode(id, request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Sample test cases evaluated", result));
    }
}
