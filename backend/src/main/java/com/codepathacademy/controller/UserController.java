package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.DashboardAnalyticsResponse;
import com.codepathacademy.dto.response.UserProfileResponse;
import com.codepathacademy.service.AuthService;
import com.codepathacademy.service.ProgressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User profile and personal progress endpoints")
public class UserController {

    private final AuthService authService;
    private final ProgressService progressService;

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        UserProfileResponse profile = authService.getCurrentUserProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> body) {
        String fullName = body.get("fullName");
        UserProfileResponse profile = authService.updateProfile(userDetails.getUsername(), fullName);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", profile));
    }

    @GetMapping("/me/progress")
    @Operation(summary = "Get current user learning analytics & dashboard stats")
    public ResponseEntity<ApiResponse<DashboardAnalyticsResponse>> getUserProgress(
            @AuthenticationPrincipal UserDetails userDetails) {
        DashboardAnalyticsResponse analytics = progressService.getDashboardAnalytics(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(analytics));
    }
}
