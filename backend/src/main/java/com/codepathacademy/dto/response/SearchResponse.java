package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResponse {
    private String query;
    private List<SearchResultItem> results;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SearchResultItem {
        private String type; // LANGUAGE, FRAMEWORK, COURSE, TOPIC, LESSON, PROBLEM
        private Long id;
        private String title;
        private String snippet;
        private String url;
        private String badge;
    }
}
