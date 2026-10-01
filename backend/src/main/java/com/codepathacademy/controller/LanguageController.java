package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.LanguageResponse;
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
@RequestMapping("/api/languages")
@RequiredArgsConstructor
@Tag(name = "Languages", description = "Programming language catalog and overview endpoints")
public class LanguageController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "Get all supported programming languages with user progress")
    public ResponseEntity<ApiResponse<List<LanguageResponse>>> getAllLanguages(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        List<LanguageResponse> list = courseService.getAllLanguages(username);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get language details by slug (c, cpp, java, python, javascript, sql)")
    public ResponseEntity<ApiResponse<LanguageResponse>> getLanguageBySlug(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        LanguageResponse response = courseService.getLanguageBySlug(slug, username);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
