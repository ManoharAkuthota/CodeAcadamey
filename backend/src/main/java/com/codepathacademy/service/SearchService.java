package com.codepathacademy.service;

import com.codepathacademy.dto.response.SearchResponse;
import com.codepathacademy.entity.*;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final LanguageRepository languageRepository;
    private final FrameworkRepository frameworkRepository;
    private final CourseRepository courseRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final CodingProblemRepository codingProblemRepository;

    @Transactional(readOnly = true)
    public SearchResponse search(String query) {
        if (query == null || query.trim().length() < 2) {
            return SearchResponse.builder().query(query).results(List.of()).build();
        }

        String q = query.trim().toLowerCase();
        List<SearchResponse.SearchResultItem> items = new ArrayList<>();

        // 1. Languages
        for (Language l : languageRepository.findAll()) {
            if (l.getName().toLowerCase().contains(q) || (l.getDescription() != null && l.getDescription().toLowerCase().contains(q))) {
                items.add(SearchResponse.SearchResultItem.builder()
                        .type("LANGUAGE")
                        .id(l.getId())
                        .title(l.getName() + " Language")
                        .snippet(l.getDescription() != null && l.getDescription().length() > 100
                                ? l.getDescription().substring(0, 100) + "..." : l.getDescription())
                        .url("/languages/" + l.getSlug())
                        .badge("Language")
                        .build());
            }
        }

        // 2. Frameworks
        for (Framework f : frameworkRepository.findAll()) {
            if (f.getName().toLowerCase().contains(q) || (f.getDescription() != null && f.getDescription().toLowerCase().contains(q))) {
                items.add(SearchResponse.SearchResultItem.builder()
                        .type("FRAMEWORK")
                        .id(f.getId())
                        .title(f.getName() + " Framework (" + f.getCategory() + ")")
                        .snippet(f.getDescription() != null && f.getDescription().length() > 100
                                ? f.getDescription().substring(0, 100) + "..." : f.getDescription())
                        .url("/frameworks")
                        .badge("Framework")
                        .build());
            }
        }

        // 3. Courses
        for (Course c : courseRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q)) {
            items.add(SearchResponse.SearchResultItem.builder()
                    .type("COURSE")
                    .id(c.getId())
                    .title(c.getTitle())
                    .snippet(c.getDescription() != null && c.getDescription().length() > 100
                            ? c.getDescription().substring(0, 100) + "..." : c.getDescription())
                    .url("/course/" + c.getId())
                    .badge("Course")
                    .build());
        }

        // 4. Topics
        for (Topic t : topicRepository.findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCase(q, q)) {
            items.add(SearchResponse.SearchResultItem.builder()
                    .type("TOPIC")
                    .id(t.getId())
                    .title(t.getTitle())
                    .snippet(t.getSummary())
                    .url("/topic/" + t.getId())
                    .badge("Topic")
                    .build());
        }

        // 5. Lessons
        for (Lesson l : lessonRepository.findByTitleContainingIgnoreCase(q)) {
            items.add(SearchResponse.SearchResultItem.builder()
                    .type("LESSON")
                    .id(l.getId())
                    .title(l.getTitle())
                    .snippet(l.getTopic().getTitle() + " - Code & Explanation")
                    .url("/lesson/" + l.getId())
                    .badge("Lesson")
                    .build());
        }

        // 6. Coding Problems
        for (CodingProblem p : codingProblemRepository.findByTitleContainingIgnoreCase(q)) {
            items.add(SearchResponse.SearchResultItem.builder()
                    .type("PROBLEM")
                    .id(p.getId())
                    .title(p.getTitle() + " (" + p.getDifficulty() + ")")
                    .snippet(p.getDescription() != null && p.getDescription().length() > 100
                            ? p.getDescription().substring(0, 100) + "..." : p.getDescription())
                    .url("/coding-practice?problem=" + p.getId())
                    .badge("Problem")
                    .build());
        }

        return SearchResponse.builder()
                .query(query)
                .results(items)
                .build();
    }
}
