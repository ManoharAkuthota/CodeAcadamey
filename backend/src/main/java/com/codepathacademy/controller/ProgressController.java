package com.codepathacademy.controller;

import com.codepathacademy.dto.response.AchievementResponse;
import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.DashboardAnalyticsResponse;
import com.codepathacademy.service.ProgressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@Tag(name = "Progress & Gamification", description = "Student progress, activity metrics, and achievements")
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping
    @Operation(summary = "Get overall student progress and dashboard analytics")
    public ResponseEntity<ApiResponse<DashboardAnalyticsResponse>> getProgress(
            @AuthenticationPrincipal UserDetails userDetails) {
        DashboardAnalyticsResponse response = progressService.getDashboardAnalytics(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/achievements")
    @Operation(summary = "Get list of all platform badges and user unlock status")
    public ResponseEntity<ApiResponse<List<AchievementResponse>>> getAchievements(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        List<AchievementResponse> list = progressService.getAllAchievements(username);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
