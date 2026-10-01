package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.ProjectRecommendationResponse;
import com.codepathacademy.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Project recommendation engine and portfolio blueprints")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "Get project recommendations matched with student mastery")
    public ResponseEntity<ApiResponse<List<ProjectRecommendationResponse>>> getProjects(
            @RequestParam(required = false) String tier,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        List<ProjectRecommendationResponse> list = projectService.getProjectCatalog(tier, username);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
