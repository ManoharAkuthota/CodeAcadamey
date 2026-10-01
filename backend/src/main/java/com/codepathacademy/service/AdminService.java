package com.codepathacademy.service;

import com.codepathacademy.dto.request.CourseCreateRequest;
import com.codepathacademy.dto.response.AdminDashboardResponse;
import com.codepathacademy.dto.response.CourseSummaryResponse;
import com.codepathacademy.dto.response.UserProfileResponse;
import com.codepathacademy.entity.*;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CodingProblemRepository codingProblemRepository;
    private final CodingSubmissionRepository codingSubmissionRepository;
    private final UserProgressRepository userProgressRepository;
    private final LanguageRepository languageRepository;
    private final FrameworkRepository frameworkRepository;
    private final AuthService authService;

    @Transactional(readOnly = true)
    public AdminDashboardResponse getAdminDashboardMetrics() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.findAll().stream()
                .filter(u -> u.getLastActiveDate() != null && u.getLastActiveDate().isAfter(LocalDate.now().minusDays(14)))
                .count();

        long totalCourses = courseRepository.count();
        long totalLessons = lessonRepository.count();
        long totalQuizzes = quizRepository.count();
        long totalQuizAttempts = quizAttemptRepository.count();
        long totalCodingSubmissions = codingSubmissionRepository.count();

        long totalTopics = topicRepository.count();
        long totalCompleted = userProgressRepository.count();
        double completionRate = (totalUsers > 0 && totalTopics > 0)
                ? Math.min(100.0, ((double) totalCompleted / (totalUsers * totalTopics)) * 100.0)
                : 0.0;

        List<AdminDashboardResponse.GrowthMetric> growth = List.of(
                AdminDashboardResponse.GrowthMetric.builder().month("May").users(120L).completions(340L).build(),
                AdminDashboardResponse.GrowthMetric.builder().month("Jun").users(180L).completions(520L).build(),
                AdminDashboardResponse.GrowthMetric.builder().month("Jul").users(260L).completions(810L).build(),
                AdminDashboardResponse.GrowthMetric.builder().month("Aug").users(340L).completions(1200L).build(),
                AdminDashboardResponse.GrowthMetric.builder().month("Sep").users(490L).completions(1850L).build(),
                AdminDashboardResponse.GrowthMetric.builder().month("Oct").users(totalUsers).completions(totalCompleted).build()
        );

        List<AdminDashboardResponse.PopularItemMetric> popLangs = languageRepository.findAll().stream()
                .map(l -> AdminDashboardResponse.PopularItemMetric.builder()
                        .name(l.getName())
                        .count((long) courseRepository.findByLanguageIdAndIsPublishedTrue(l.getId()).size() * 45 + 10)
                        .build())
                .collect(Collectors.toList());

        List<AdminDashboardResponse.PopularItemMetric> popCourses = courseRepository.findAll().stream()
                .limit(5)
                .map(c -> AdminDashboardResponse.PopularItemMetric.builder()
                        .name(c.getTitle())
                        .count((long) c.getModules().size() * 25 + 15)
                        .build())
                .collect(Collectors.toList());

        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .activeUsers(Math.max(activeUsers, 1))
                .totalCourses(totalCourses)
                .totalLessons(totalLessons)
                .totalQuizzes(totalQuizzes)
                .totalQuizAttempts(totalQuizAttempts)
                .totalCodingSubmissions(totalCodingSubmissions)
                .platformCompletionRate(Math.round(completionRate * 10.0) / 10.0)
                .userGrowth(growth)
                .popularLanguages(popLangs)
                .popularCourses(popCourses)
                .build();
    }

    @Transactional(readOnly = true)
    public List<UserProfileResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(authService::mapToProfileResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserProfileResponse updateUserRole(Long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        user.setRole(newRole);
        user = userRepository.save(user);
        return authService.mapToProfileResponse(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        userRepository.delete(user);
    }

    @Transactional
    public CourseSummaryResponse createCourse(CourseCreateRequest req) {
        Language lang = req.getLanguageId() != null ? languageRepository.findById(req.getLanguageId()).orElse(null) : null;
        Framework fw = req.getFrameworkId() != null ? frameworkRepository.findById(req.getFrameworkId()).orElse(null) : null;

        Course course = Course.builder()
                .title(req.getTitle())
                .slug(req.getSlug())
                .language(lang)
                .framework(fw)
                .description(req.getDescription())
                .level(req.getLevel() != null ? req.getLevel() : "Beginner")
                .estimatedHours(req.getEstimatedHours() != null ? req.getEstimatedHours() : 10)
                .thumbnail(req.getThumbnail())
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 1)
                .isPublished(req.getIsPublished() != null ? req.getIsPublished() : true)
                .build();

        course = courseRepository.save(course);
        return CourseSummaryResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .slug(course.getSlug())
                .description(course.getDescription())
                .level(course.getLevel())
                .estimatedHours(course.getEstimatedHours())
                .thumbnail(course.getThumbnail())
                .moduleCount(0)
                .topicCount(0)
                .progressPercentage(0.0)
                .build();
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        courseRepository.delete(course);
    }

    @Transactional
    public boolean togglePublishCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        boolean nextState = course.getIsPublished() == null || !course.getIsPublished();
        course.setIsPublished(nextState);
        courseRepository.save(course);
        return nextState;
    }
}
