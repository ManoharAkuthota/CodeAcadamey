package com.codepathacademy.controller;

import com.codepathacademy.dto.request.NoteRequest;
import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.NoteResponse;
import com.codepathacademy.service.NoteService;
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
@RequestMapping("/api/notes")
@RequiredArgsConstructor
@Tag(name = "Notes", description = "Student markdown notes and topic note linkage")
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    @Operation(summary = "Get user notes with optional keyword search")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> getNotes(
            @RequestParam(required = false) String search,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<NoteResponse> list = noteService.getNotes(userDetails.getUsername(), search);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/topic/{topicId}")
    @Operation(summary = "Get user note for a specific topic")
    public ResponseEntity<ApiResponse<NoteResponse>> getNoteByTopic(
            @PathVariable Long topicId,
            @AuthenticationPrincipal UserDetails userDetails) {
        NoteResponse note = noteService.getNoteByTopic(topicId, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(note));
    }

    @PostMapping
    @Operation(summary = "Create or update a personal note")
    public ResponseEntity<ApiResponse<NoteResponse>> saveNote(
            @Valid @RequestBody NoteRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        NoteResponse response = noteService.saveOrUpdateNote(request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Note saved successfully", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete note by ID")
    public ResponseEntity<ApiResponse<Void>> deleteNote(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        noteService.deleteNote(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Note deleted successfully", null));
    }
}
