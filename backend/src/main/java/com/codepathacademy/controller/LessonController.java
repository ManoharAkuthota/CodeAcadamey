package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.LessonResponse;
import com.codepathacademy.service.LessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Tag(name = "Lessons", description = "Lesson content, interactive code breakdowns, and topic completion endpoints")
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/{id}")
    @Operation(summary = "Get lesson by lesson ID with code explanation and architecture mapping")
    public ResponseEntity<ApiResponse<LessonResponse>> getLessonById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        LessonResponse response = lessonService.getLessonById(id, username);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/topic/{topicId}")
    @Operation(summary = "Get the active lesson for a given topic ID")
    public ResponseEntity<ApiResponse<LessonResponse>> getLessonByTopicId(
            @PathVariable Long topicId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        LessonResponse response = lessonService.getLessonByTopicId(topicId, username);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/topic/{topicId}/complete")
    @Operation(summary = "Mark a topic as completed by the student and award XP")
    public ResponseEntity<ApiResponse<Boolean>> markTopicComplete(
            @PathVariable Long topicId,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean firstTime = lessonService.markTopicComplete(topicId, userDetails.getUsername());
        String msg = firstTime ? "Topic marked as complete! +10 XP awarded." : "Topic is already marked as complete.";
        return ResponseEntity.ok(ApiResponse.ok(msg, firstTime));
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Mark a lesson's topic as complete by lesson ID")
    public ResponseEntity<ApiResponse<Boolean>> completeLessonById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        LessonResponse lesson = lessonService.getLessonById(id, userDetails.getUsername());
        boolean firstTime = lessonService.markTopicComplete(lesson.getTopicId(), userDetails.getUsername());
        String msg = firstTime ? "Topic marked as complete! +10 XP awarded." : "Topic is already marked as complete.";
        return ResponseEntity.ok(ApiResponse.ok(msg, firstTime));
    }
}
