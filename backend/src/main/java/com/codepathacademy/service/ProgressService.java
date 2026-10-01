package com.codepathacademy.service;

import com.codepathacademy.dto.response.AchievementResponse;
import com.codepathacademy.dto.response.DashboardAnalyticsResponse;
import com.codepathacademy.entity.*;
import com.codepathacademy.entity.Module;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CodingSubmissionRepository codingSubmissionRepository;
    private final LearningActivityRepository learningActivityRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final AchievementRepository achievementRepository;
    private final CourseRepository courseRepository;
    private final LanguageRepository languageRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final GamificationService gamificationService;

    @Transactional(readOnly = true)
    public DashboardAnalyticsResponse getDashboardAnalytics(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        // 1. Metric Cards
        long topicsCompleted = userProgressRepository.countByUserIdAndIsCompletedTrue(user.getId());
        Double avgQuizScore = quizAttemptRepository.findAverageScoreByUserId(user.getId());
        if (avgQuizScore == null) avgQuizScore = 0.0;

        long problemsSolved = codingSubmissionRepository.findByUserIdOrderBySubmittedAtDesc(user.getId()).stream()
                .filter(s -> "ACCEPTED".equalsIgnoreCase(s.getStatus()))
                .map(s -> s.getProblem().getId())
                .distinct()
                .count();

        int userXp = user.getXp() != null ? user.getXp() : 0;
        int nextLevelXp = gamificationService.getNextLevelThreshold(userXp);

        // 2. Weekly Activity (Past 7 days)
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(6);
        List<LearningActivity> weekActivities = learningActivityRepository
                .findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(user.getId(), sevenDaysAgo, today);

        Map<LocalDate, Integer> dayXpMap = new HashMap<>();
        Map<LocalDate, Integer> dayLessonsMap = new HashMap<>();
        for (LearningActivity act : weekActivities) {
            LocalDate d = act.getActivityDate();
            dayXpMap.put(d, dayXpMap.getOrDefault(d, 0) + act.getXpEarned());
            if ("LESSON_COMPLETED".equals(act.getActivityType())) {
                dayLessonsMap.put(d, dayLessonsMap.getOrDefault(d, 0) + 1);
            }
        }

        List<DashboardAnalyticsResponse.DailyActivityItem> weeklyList = new ArrayList<>();
        DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("EEE");
        for (int i = 6; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            weeklyList.add(DashboardAnalyticsResponse.DailyActivityItem.builder()
                    .day(d.format(dayFormatter))
                    .xp(dayXpMap.getOrDefault(d, 0))
                    .lessonsCompleted(dayLessonsMap.getOrDefault(d, 0))
                    .build());
        }

        // 3. Language Progress
        List<Language> languages = languageRepository.findByIsPublishedTrueOrderByDisplayOrderAsc();
        List<DashboardAnalyticsResponse.LanguageProgressItem> langProgress = new ArrayList<>();
        for (Language lang : languages) {
            List<Course> langCourses = courseRepository.findByLanguageIdAndIsPublishedTrue(lang.getId());
            long total = 0;
            long comp = 0;
            for (Course c : langCourses) {
                for (Module m : c.getModules()) {
                    total += m.getTopics().size();
                }
                comp += userProgressRepository.countCompletedTopicsByUserIdAndCourseId(user.getId(), c.getId());
            }
            double pct = total > 0 ? ((double) comp / total) * 100.0 : 0.0;
            langProgress.add(DashboardAnalyticsResponse.LanguageProgressItem.builder()
                    .language(lang.getName())
                    .progressPercentage(Math.round(pct * 10.0) / 10.0)
                    .color(lang.getColor() != null ? lang.getColor() : "#22c55e")
                    .build());
        }

        // 4. Quiz Performance
        List<QuizAttempt> recentAttempts = quizAttemptRepository.findByUserIdOrderByAttemptedAtDesc(user.getId());
        List<DashboardAnalyticsResponse.QuizPerformanceItem> quizPerf = recentAttempts.stream()
                .limit(5)
                .map(qa -> DashboardAnalyticsResponse.QuizPerformanceItem.builder()
                        .quizTitle(qa.getQuiz().getTitle())
                        .score(qa.getPercentage() != null ? qa.getPercentage().intValue() : 0)
                        .passingScore(qa.getQuiz().getPassingScore())
                        .build())
                .collect(Collectors.toList());

        // 5. Skill Distribution
        List<DashboardAnalyticsResponse.SkillDistributionItem> skills = List.of(
                DashboardAnalyticsResponse.SkillDistributionItem.builder().subject("Fundamentals").proficiency(Math.min(100, (int)(topicsCompleted * 12))).fullMark(100).build(),
                DashboardAnalyticsResponse.SkillDistributionItem.builder().subject("OOP").proficiency(Math.min(100, (int)(topicsCompleted * 8))).fullMark(100).build(),
                DashboardAnalyticsResponse.SkillDistributionItem.builder().subject("Backend").proficiency(Math.min(100, (int)(topicsCompleted * 6))).fullMark(100).build(),
                DashboardAnalyticsResponse.SkillDistributionItem.builder().subject("Database").proficiency(Math.min(100, (int)(problemsSolved * 15))).fullMark(100).build(),
                DashboardAnalyticsResponse.SkillDistributionItem.builder().subject("Problem Solving").proficiency(Math.min(100, (int)(problemsSolved * 20))).fullMark(100).build(),
                DashboardAnalyticsResponse.SkillDistributionItem.builder().subject("Architecture").proficiency(Math.min(100, userXp / 30)).fullMark(100).build()
        );

        // 6. Resume Topic (last completed + 1, or default first available topic)
        DashboardAnalyticsResponse.RecentTopicItem resumeTopic = null;
        List<UserProgress> userProgressList = userProgressRepository.findByUserId(user.getId());
        if (!userProgressList.isEmpty()) {
            Topic lastTopic = userProgressList.get(userProgressList.size() - 1).getTopic();
            Long lessonId = lessonRepository.findFirstByTopicIdOrderByLessonOrderAsc(lastTopic.getId())
                    .map(Lesson::getId).orElse(null);
            resumeTopic = DashboardAnalyticsResponse.RecentTopicItem.builder()
                    .topicId(lastTopic.getId())
                    .topicTitle(lastTopic.getTitle())
                    .courseId(lastTopic.getModule().getCourse().getId())
                    .courseTitle(lastTopic.getModule().getCourse().getTitle())
                    .lessonId(lessonId)
                    .build();
        } else {
            // Pick first topic of first course
            Optional<Course> firstCourse = courseRepository.findAll().stream().findFirst();
            if (firstCourse.isPresent() && !firstCourse.get().getModules().isEmpty() && !firstCourse.get().getModules().get(0).getTopics().isEmpty()) {
                Topic t = firstCourse.get().getModules().get(0).getTopics().get(0);
                Long lessonId = lessonRepository.findFirstByTopicIdOrderByLessonOrderAsc(t.getId())
                        .map(Lesson::getId).orElse(null);
                resumeTopic = DashboardAnalyticsResponse.RecentTopicItem.builder()
                        .topicId(t.getId())
                        .topicTitle(t.getTitle())
                        .courseId(firstCourse.get().getId())
                        .courseTitle(firstCourse.get().getTitle())
                        .lessonId(lessonId)
                        .build();
            }
        }

        // 7. Recent Achievements
        List<UserAchievement> userBadges = userAchievementRepository.findByUserId(user.getId());
        List<AchievementResponse> recentBadges = userBadges.stream()
                .map(ub -> AchievementResponse.builder()
                        .id(ub.getAchievement().getId())
                        .badgeKey(ub.getAchievement().getBadgeKey())
                        .title(ub.getAchievement().getTitle())
                        .description(ub.getAchievement().getDescription())
                        .icon(ub.getAchievement().getIcon())
                        .xpReward(ub.getAchievement().getXpReward())
                        .category(ub.getAchievement().getCategory())
                        .isUnlocked(true)
                        .earnedAt(ub.getEarnedAt())
                        .build())
                .collect(Collectors.toList());

        long enrolledCount = courseRepository.findAll().stream()
                .filter(c -> userProgressRepository.countCompletedTopicsByUserIdAndCourseId(user.getId(), c.getId()) > 0)
                .count();

        return DashboardAnalyticsResponse.builder()
                .totalCoursesEnrolled(Math.max(enrolledCount, 1))
                .topicsCompleted(topicsCompleted)
                .averageQuizScore(Math.round(avgQuizScore * 10.0) / 10.0)
                .codingProblemsSolved(problemsSolved)
                .currentStreak(user.getStreakDays() != null ? user.getStreakDays() : 1)
                .learningHours(user.getLearningHours() != null ? user.getLearningHours() : 1.5)
                .totalXp(userXp)
                .currentLevel(user.getLevel())
                .nextLevelXp(nextLevelXp)
                .weeklyActivity(weeklyList)
                .languageProgress(langProgress)
                .quizPerformance(quizPerf)
                .skillDistribution(skills)
                .resumeTopic(resumeTopic)
                .recentAchievements(recentBadges)
                .build();
    }

    @Transactional(readOnly = true)
    public List<AchievementResponse> getAllAchievements(String username) {
        List<Achievement> allAchievements = achievementRepository.findAll();
        User user = username != null ? userRepository.findByUsername(username).orElse(null) : null;
        Map<Long, UserAchievement> userMap = user != null
                ? userAchievementRepository.findByUserId(user.getId()).stream()
                .collect(Collectors.toMap(ua -> ua.getAchievement().getId(), ua -> ua))
                : Collections.emptyMap();

        return allAchievements.stream().map(a -> {
            boolean unlocked = userMap.containsKey(a.getId());
            return AchievementResponse.builder()
                    .id(a.getId())
                    .badgeKey(a.getBadgeKey())
                    .title(a.getTitle())
                    .description(a.getDescription())
                    .icon(a.getIcon())
                    .xpReward(a.getXpReward())
                    .category(a.getCategory())
                    .isUnlocked(unlocked)
                    .earnedAt(unlocked ? userMap.get(a.getId()).getEarnedAt() : null)
                    .build();
        }).collect(Collectors.toList());
    }
}
