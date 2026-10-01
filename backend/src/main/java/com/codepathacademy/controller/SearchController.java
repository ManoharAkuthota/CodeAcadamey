package com.codepathacademy.controller;

import com.codepathacademy.dto.response.ApiResponse;
import com.codepathacademy.dto.response.SearchResponse;
import com.codepathacademy.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Tag(name = "Search", description = "Global unified platform search endpoints")
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    @Operation(summary = "Search across languages, frameworks, courses, topics, lessons, and problems")
    public ResponseEntity<ApiResponse<SearchResponse>> search(@RequestParam(name = "q", defaultValue = "") String query) {
        SearchResponse response = searchService.search(query);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
