package com.codepathacademy.service;

import com.codepathacademy.dto.response.*;
import com.codepathacademy.entity.*;
import com.codepathacademy.entity.Module;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final LanguageRepository languageRepository;
    private final FrameworkRepository frameworkRepository;
    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final QuizRepository quizRepository;
    private final UserProgressRepository userProgressRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<LanguageResponse> getAllLanguages(String username) {
        List<Language> languages = languageRepository.findByIsPublishedTrueOrderByDisplayOrderAsc();
        User user = username != null ? userRepository.findByUsername(username).orElse(null) : null;

        return languages.stream().map(lang -> {
            long courseCount = courseRepository.findByLanguageIdAndIsPublishedTrue(lang.getId()).size();
            Double progress = 0.0;
            if (user != null && courseCount > 0) {
                // Approximate progress across courses in this language
                List<Course> courses = courseRepository.findByLanguageIdAndIsPublishedTrue(lang.getId());
                long totalTopics = 0;
                long completedTopics = 0;
                for (Course c : courses) {
                    for (Module m : c.getModules()) {
                        totalTopics += m.getTopics().size();
                    }
                    completedTopics += userProgressRepository.countCompletedTopicsByUserIdAndCourseId(user.getId(), c.getId());
                }
                if (totalTopics > 0) {
                    progress = Math.min(100.0, (double) completedTopics / totalTopics * 100.0);
                }
            }
            return LanguageResponse.builder()
                    .id(lang.getId())
                    .name(lang.getName())
                    .slug(lang.getSlug())
                    .description(lang.getDescription())
                    .whyLearn(lang.getWhyLearn())
                    .difficulty(lang.getDifficulty())
                    .prerequisites(lang.getPrerequisites())
                    .icon(lang.getIcon())
                    .color(lang.getColor())
                    .displayOrder(lang.getDisplayOrder())
                    .courseCount(courseCount)
                    .userProgressPercentage(Math.round(progress * 10.0) / 10.0)
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LanguageResponse getLanguageBySlug(String slug, String username) {
        Language lang = languageRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Language not found: " + slug));

        long courseCount = courseRepository.findByLanguageIdAndIsPublishedTrue(lang.getId()).size();
        return LanguageResponse.builder()
                .id(lang.getId())
                .name(lang.getName())
                .slug(lang.getSlug())
                .description(lang.getDescription())
                .whyLearn(lang.getWhyLearn())
                .difficulty(lang.getDifficulty())
                .prerequisites(lang.getPrerequisites())
                .icon(lang.getIcon())
                .color(lang.getColor())
                .displayOrder(lang.getDisplayOrder())
                .courseCount(courseCount)
                .build();
    }

    @Transactional(readOnly = true)
    public List<FrameworkResponse> getAllFrameworks() {
        return frameworkRepository.findByIsPublishedTrueOrderByDisplayOrderAsc().stream()
                .map(fw -> {
                    long courseCount = courseRepository.findByFrameworkIdAndIsPublishedTrue(fw.getId()).size();
                    return FrameworkResponse.builder()
                            .id(fw.getId())
                            .name(fw.getName())
                            .slug(fw.getSlug())
                            .category(fw.getCategory())
                            .description(fw.getDescription())
                            .whyUseIt(fw.getWhyUseIt())
                            .prerequisites(fw.getPrerequisites())
                            .architecture(fw.getArchitecture())
                            .coreConcepts(fw.getCoreConcepts())
                            .icon(fw.getIcon())
                            .color(fw.getColor())
                            .displayOrder(fw.getDisplayOrder())
                            .courseCount(courseCount)
                            .build();
                }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FrameworkResponse getFrameworkBySlug(String slug) {
        Framework fw = frameworkRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Framework not found: " + slug));
        long courseCount = courseRepository.findByFrameworkIdAndIsPublishedTrue(fw.getId()).size();
        return FrameworkResponse.builder()
                .id(fw.getId())
                .name(fw.getName())
                .slug(fw.getSlug())
                .category(fw.getCategory())
                .description(fw.getDescription())
                .whyUseIt(fw.getWhyUseIt())
                .prerequisites(fw.getPrerequisites())
                .architecture(fw.getArchitecture())
                .coreConcepts(fw.getCoreConcepts())
                .icon(fw.getIcon())
                .color(fw.getColor())
                .displayOrder(fw.getDisplayOrder())
                .courseCount(courseCount)
                .build();
    }

    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> getAllCourses(String username) {
        List<Course> courses = courseRepository.findByIsPublishedTrueOrderByDisplayOrderAsc();
        User user = username != null ? userRepository.findByUsername(username).orElse(null) : null;

        return courses.stream().map(course -> mapToCourseSummary(course, user)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> getCoursesByLanguage(Long languageId, String username) {
        List<Course> courses = courseRepository.findByLanguageIdAndIsPublishedTrue(languageId);
        User user = username != null ? userRepository.findByUsername(username).orElse(null) : null;
        return courses.stream().map(course -> mapToCourseSummary(course, user)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CourseDetailResponse getCourseDetail(Long courseId, String username) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        return buildCourseDetail(course, username);
    }

    @Transactional(readOnly = true)
    public CourseDetailResponse getCourseDetailBySlug(String slug, String username) {
        Course course = courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with slug: " + slug));
        return buildCourseDetail(course, username);
    }

    private CourseDetailResponse buildCourseDetail(Course course, String username) {
        User user = username != null ? userRepository.findByUsername(username).orElse(null) : null;
        Set<Long> completedTopicIds = user != null
                ? new HashSet<>(userProgressRepository.findCompletedTopicIdsByUserId(user.getId()))
                : Collections.emptySet();

        Map<Long, String> topicTitleMap = new HashMap<>();
        for (Module m : course.getModules()) {
            for (Topic t : m.getTopics()) {
                topicTitleMap.put(t.getId(), t.getTitle());
            }
        }

        long totalTopics = 0;
        long completedTopics = 0;

        List<ModuleResponse> moduleResponses = new ArrayList<>();
        for (Module module : course.getModules()) {
            List<TopicResponse> topicResponses = new ArrayList<>();
            for (Topic topic : module.getTopics()) {
                totalTopics++;
                boolean isCompleted = completedTopicIds.contains(topic.getId());
                if (isCompleted) {
                    completedTopics++;
                }

                boolean isLocked = false;
                String prereqTitle = null;
                if (topic.getPrerequisiteTopicId() != null) {
                    prereqTitle = topicTitleMap.get(topic.getPrerequisiteTopicId());
                    if (!completedTopicIds.contains(topic.getPrerequisiteTopicId())) {
                        isLocked = true;
                    }
                }

                Long quizId = quizRepository.findByTopicIdAndIsPublishedTrue(topic.getId())
                        .map(Quiz::getId).orElse(null);
                Long lessonId = lessonRepository.findFirstByTopicIdOrderByLessonOrderAsc(topic.getId())
                        .map(Lesson::getId).orElse(null);

                topicResponses.add(TopicResponse.builder()
                        .id(topic.getId())
                        .moduleId(module.getId())
                        .title(topic.getTitle())
                        .slug(topic.getSlug())
                        .summary(topic.getSummary())
                        .topicOrder(topic.getTopicOrder())
                        .prerequisiteTopicId(topic.getPrerequisiteTopicId())
                        .prerequisiteTopicTitle(prereqTitle)
                        .isLocked(isLocked)
                        .isCompleted(isCompleted)
                        .quizId(quizId)
                        .lessonId(lessonId)
                        .build());
            }

            moduleResponses.add(ModuleResponse.builder()
                    .id(module.getId())
                    .courseId(course.getId())
                    .title(module.getTitle())
                    .description(module.getDescription())
                    .moduleOrder(module.getModuleOrder())
                    .topics(topicResponses)
                    .build());
        }

        double progress = totalTopics > 0 ? ((double) completedTopics / totalTopics) * 100.0 : 0.0;

        return CourseDetailResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .slug(course.getSlug())
                .description(course.getDescription())
                .level(course.getLevel())
                .estimatedHours(course.getEstimatedHours())
                .thumbnail(course.getThumbnail())
                .languageId(course.getLanguage() != null ? course.getLanguage().getId() : null)
                .languageName(course.getLanguage() != null ? course.getLanguage().getName() : null)
                .languageSlug(course.getLanguage() != null ? course.getLanguage().getSlug() : null)
                .frameworkId(course.getFramework() != null ? course.getFramework().getId() : null)
                .frameworkName(course.getFramework() != null ? course.getFramework().getName() : null)
                .frameworkSlug(course.getFramework() != null ? course.getFramework().getSlug() : null)
                .modules(moduleResponses)
                .totalTopics(totalTopics)
                .completedTopics(completedTopics)
                .progressPercentage(Math.round(progress * 10.0) / 10.0)
                .build();
    }

    private CourseSummaryResponse mapToCourseSummary(Course course, User user) {
        int topicCount = 0;
        for (Module m : course.getModules()) {
            topicCount += m.getTopics().size();
        }

        double progress = 0.0;
        if (user != null && topicCount > 0) {
            long completed = userProgressRepository.countCompletedTopicsByUserIdAndCourseId(user.getId(), course.getId());
            progress = Math.min(100.0, ((double) completed / topicCount) * 100.0);
        }

        return CourseSummaryResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .slug(course.getSlug())
                .description(course.getDescription())
                .level(course.getLevel())
                .estimatedHours(course.getEstimatedHours())
                .thumbnail(course.getThumbnail())
                .languageName(course.getLanguage() != null ? course.getLanguage().getName() : null)
                .languageSlug(course.getLanguage() != null ? course.getLanguage().getSlug() : null)
                .frameworkName(course.getFramework() != null ? course.getFramework().getName() : null)
                .frameworkSlug(course.getFramework() != null ? course.getFramework().getSlug() : null)
                .moduleCount(course.getModules().size())
                .topicCount(topicCount)
                .progressPercentage(Math.round(progress * 10.0) / 10.0)
                .build();
    }
}
