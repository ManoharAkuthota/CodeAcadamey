package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.CourseDetailResponse;
import com.codepathacademy.dto.response.CourseSummaryResponse;
import com.codepathacademy.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Course listing, curriculum structure, and progress endpoints")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "Get all courses with student completion progress")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getAllCourses(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        List<CourseSummaryResponse> list = courseService.getAllCourses(username);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed course curriculum with modules, topics, and lock states")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> getCourseById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        CourseDetailResponse detail = courseService.getCourseDetail(id, username);
        return ResponseEntity.ok(ApiResponse.ok(detail));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get detailed course curriculum by course slug")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> getCourseBySlug(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        CourseDetailResponse detail = courseService.getCourseDetailBySlug(slug, username);
        return ResponseEntity.ok(ApiResponse.ok(detail));
    }

    @GetMapping("/by-language/{languageId}")
    @Operation(summary = "Get all courses under a specific programming language")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getCoursesByLanguage(
            @PathVariable Long languageId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        List<CourseSummaryResponse> list = courseService.getCoursesByLanguage(languageId, username);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
