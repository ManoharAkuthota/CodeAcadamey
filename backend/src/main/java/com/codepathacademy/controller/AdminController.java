package com.codepathacademy.controller;

import com.codepathacademy.dto.request.CourseCreateRequest;
import com.codepathacademy.dto.response.AdminDashboardResponse;
import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.CourseSummaryResponse;
import com.codepathacademy.dto.response.UserProfileResponse;
import com.codepathacademy.entity.Role;
import com.codepathacademy.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Tag(name = "Admin", description = "Administration dashboard, content authoring, and user management")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get admin dashboard overview metrics and platform growth trends")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getDashboardMetrics() {
        AdminDashboardResponse metrics = adminService.getAdminDashboardMetrics();
        return ResponseEntity.ok(ApiResponse.ok(metrics));
    }

    @GetMapping("/users")
    @Operation(summary = "Get all registered users")
    public ResponseEntity<ApiResponse<List<UserProfileResponse>>> getAllUsers() {
        List<UserProfileResponse> users = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    @PutMapping("/users/{userId}/role")
    @Operation(summary = "Update user role (ROLE_USER or ROLE_ADMIN)")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateUserRole(
            @PathVariable Long userId,
            @RequestBody Map<String, String> body) {
        Role role = Role.valueOf(body.get("role"));
        UserProfileResponse updated = adminService.updateUserRole(userId, role);
        return ResponseEntity.ok(ApiResponse.ok("User role updated successfully", updated));
    }

    @DeleteMapping("/users/{userId}")
    @Operation(summary = "Delete user account")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.ok("User deleted successfully", null));
    }

    @PostMapping("/courses")
    @Operation(summary = "Create a new course")
    public ResponseEntity<ApiResponse<CourseSummaryResponse>> createCourse(
            @Valid @RequestBody CourseCreateRequest request) {
        CourseSummaryResponse created = adminService.createCourse(request);
        return ResponseEntity.ok(ApiResponse.ok("Course created successfully", created));
    }

    @DeleteMapping("/courses/{courseId}")
    @Operation(summary = "Delete course")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long courseId) {
        adminService.deleteCourse(courseId);
        return ResponseEntity.ok(ApiResponse.ok("Course deleted successfully", null));
    }

    @PatchMapping("/courses/{courseId}/toggle-publish")
    @Operation(summary = "Toggle published status for course")
    public ResponseEntity<ApiResponse<Boolean>> togglePublishCourse(@PathVariable Long courseId) {
        boolean isPublished = adminService.togglePublishCourse(courseId);
        return ResponseEntity.ok(ApiResponse.ok("Course published status updated", isPublished));
    }
}
