package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardAnalyticsResponse {

    // Metric Cards
    private Long totalCoursesEnrolled;
    private Long topicsCompleted;
    private Double averageQuizScore;
    private Long codingProblemsSolved;
    private Integer currentStreak;
    private Double learningHours;
    private Integer totalXp;
    private String currentLevel;
    private Integer nextLevelXp;

    // Charts Data
    private List<DailyActivityItem> weeklyActivity;
    private List<LanguageProgressItem> languageProgress;
    private List<QuizPerformanceItem> quizPerformance;
    private List<SkillDistributionItem> skillDistribution;

    // Recent Active Topic / Resume
    private RecentTopicItem resumeTopic;

    // Unlocked Achievements
    private List<AchievementResponse> recentAchievements;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DailyActivityItem {
        private String day;
        private Integer xp;
        private Integer lessonsCompleted;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LanguageProgressItem {
        private String language;
        private Double progressPercentage;
        private String color;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuizPerformanceItem {
        private String quizTitle;
        private Integer score;
        private Integer passingScore;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SkillDistributionItem {
        private String subject;
        private Integer proficiency; // 0-100
        private Integer fullMark;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecentTopicItem {
        private Long topicId;
        private String topicTitle;
        private Long courseId;
        private String courseTitle;
        private Long lessonId;
    }
}
