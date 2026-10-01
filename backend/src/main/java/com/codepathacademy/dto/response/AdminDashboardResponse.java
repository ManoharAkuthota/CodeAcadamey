package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Long totalUsers;
    private Long activeUsers;
    private Long totalCourses;
    private Long totalLessons;
    private Long totalQuizzes;
    private Long totalQuizAttempts;
    private Long totalCodingSubmissions;
    private Double platformCompletionRate;

    private List<GrowthMetric> userGrowth;
    private List<PopularItemMetric> popularLanguages;
    private List<PopularItemMetric> popularCourses;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class GrowthMetric {
        private String month;
        private Long users;
        private Long completions;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PopularItemMetric {
        private String name;
        private Long count;
    }
}
