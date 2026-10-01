package com.codepathacademy.controller;

import com.codepathacademy.dto.request.BookmarkRequest;
import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.BookmarkResponse;
import com.codepathacademy.service.BookmarkService;
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
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
@Tag(name = "Bookmarks", description = "Student bookmarks management endpoints")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping
    @Operation(summary = "Get bookmarks with optional filter (ALL, LESSON, TOPIC, QUESTION, PROBLEM)")
    public ResponseEntity<ApiResponse<List<BookmarkResponse>>> getBookmarks(
            @RequestParam(required = false) String type,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<BookmarkResponse> list = bookmarkService.getBookmarks(userDetails.getUsername(), type);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @PostMapping
    @Operation(summary = "Add a bookmark")
    public ResponseEntity<ApiResponse<BookmarkResponse>> addBookmark(
            @Valid @RequestBody BookmarkRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        BookmarkResponse response = bookmarkService.addBookmark(request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Bookmark saved", response));
    }

    @PostMapping("/toggle")
    @Operation(summary = "Toggle bookmark for an item (adds if not bookmarked, removes if already bookmarked)")
    public ResponseEntity<ApiResponse<Boolean>> toggleBookmark(
            @Valid @RequestBody BookmarkRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean added = bookmarkService.toggleBookmark(request, userDetails.getUsername());
        String msg = added ? "Bookmark added" : "Bookmark removed";
        return ResponseEntity.ok(ApiResponse.ok(msg, added));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a bookmark by ID")
    public ResponseEntity<ApiResponse<Void>> deleteBookmark(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        bookmarkService.deleteBookmark(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Bookmark deleted successfully", null));
    }
}
