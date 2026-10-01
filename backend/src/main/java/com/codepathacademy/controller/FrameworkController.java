package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.FrameworkResponse;
import com.codepathacademy.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/frameworks")
@RequiredArgsConstructor
@Tag(name = "Frameworks", description = "Frameworks and technologies catalog endpoints")
public class FrameworkController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "Get all frameworks (Spring Boot, React, Django, Node, etc.)")
    public ResponseEntity<ApiResponse<List<FrameworkResponse>>> getAllFrameworks() {
        List<FrameworkResponse> list = courseService.getAllFrameworks();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get framework details and architecture by slug")
    public ResponseEntity<ApiResponse<FrameworkResponse>> getFrameworkBySlug(@PathVariable String slug) {
        FrameworkResponse response = courseService.getFrameworkBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
