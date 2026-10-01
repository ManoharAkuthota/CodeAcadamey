package com.codepathacademy.service;

import com.codepathacademy.dto.response.ProjectRecommendationResponse;
import com.codepathacademy.entity.User;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.CourseRepository;
import com.codepathacademy.repository.UserProgressRepository;
import com.codepathacademy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;

    public List<ProjectRecommendationResponse> getProjectCatalog(String tier, String username) {
        List<ProjectRecommendationResponse> all = getCuratedProjects();

        long completedTopics = 0;
        if (username != null) {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                completedTopics = userProgressRepository.countByUserIdAndIsCompletedTrue(user.getId());
            }
        }

        final long topics = completedTopics;
        return all.stream()
                .filter(p -> tier == null || tier.equalsIgnoreCase("ALL") || p.getTier().equalsIgnoreCase(tier))
                .map(p -> {
                    boolean recommended = false;
                    if ("BEGINNER".equalsIgnoreCase(p.getTier()) && topics >= 1) {
                        recommended = true;
                    } else if ("INTERMEDIATE".equalsIgnoreCase(p.getTier()) && topics >= 3) {
                        recommended = true;
                    } else if ("ADVANCED".equalsIgnoreCase(p.getTier()) && topics >= 6) {
                        recommended = true;
                    }
                    p.setRecommendedForUser(recommended);
                    return p;
                })
                .collect(Collectors.toList());
    }

    private List<ProjectRecommendationResponse> getCuratedProjects() {
        List<ProjectRecommendationResponse> list = new ArrayList<>();

        // Beginner Projects
        list.add(ProjectRecommendationResponse.builder()
                .id(1L)
                .title("Scientific CLI Calculator")
                .tier("BEGINNER")
                .description("Build a command-line calculator that parses math expressions, handles operator precedence, and computes trigonometric/logarithmic functions.")
                .difficulty("Easy")
                .estimatedHours(8)
                .requiredSkills(List.of("C / C++ / Java / Python", "Loops", "Functions", "Switch Statements", "Error Handling"))
                .features(List.of("Basic arithmetic (+, -, *, /)", "Exponentiation & roots", "Trig functions (sin, cos, tan)", "Input validation against divide by zero"))
                .techStack(List.of("C", "C++", "Java", "Python"))
                .architectureSummary("Single module or multi-function structured program with an expression tokenizer and evaluator.")
                .build());

        list.add(ProjectRecommendationResponse.builder()
                .id(2L)
                .title("Student Records & GPA Management System")
                .tier("BEGINNER")
                .description("Develop a console-based student database managing courses, marks, GPA calculation, and persistent file storage.")
                .difficulty("Easy")
                .estimatedHours(12)
                .requiredSkills(List.of("C++ / Java", "OOP", "Classes & Objects", "File I/O", "Dynamic Arrays / Vectors"))
                .features(List.of("Add, edit, delete students", "Enroll students into courses", "Calculate cumulative GPA", "Persist and load records from binary/text file"))
                .techStack(List.of("C++", "Java", "File Streams"))
                .architectureSummary("Object-oriented structure using Student, Course, and Grade classes with file persistence layer.")
                .build());

        // Intermediate Projects
        list.add(ProjectRecommendationResponse.builder()
                .id(3L)
                .title("Full Stack Banking Application")
                .tier("INTERMEDIATE")
                .description("Complete modern online banking system with account management, secure deposit/withdraw transactions, and transaction ledger.")
                .difficulty("Medium")
                .estimatedHours(25)
                .requiredSkills(List.of("Java 21", "Spring Boot 3", "Spring Data JPA", "MySQL", "React", "REST APIs"))
                .features(List.of("Account creation & KYC", "Fund transfer between accounts with ACID transactions", "Audit logs & transaction ledger", "PDF account statement download"))
                .techStack(List.of("Spring Boot", "MySQL", "Hibernate", "React", "Tailwind CSS"))
                .architectureSummary("Layered Spring Boot backend (Controller, Service, Repository) with pessimistic locking for concurrency and React single page application.")
                .build());

        list.add(ProjectRecommendationResponse.builder()
                .id(4L)
                .title("Personal Finance & Expense Tracker")
                .tier("INTERMEDIATE")
                .description("Track daily expenses, categorize transactions, visualize monthly budgets with charts, and generate financial health insights.")
                .difficulty("Medium")
                .estimatedHours(18)
                .requiredSkills(List.of("Python", "Django / Flask", "SQLite / MySQL", "Recharts / Chart.js", "REST APIs"))
                .features(List.of("Category budgeting", "Monthly expense analytics", "Recurring subscriptions reminder", "CSV export of expenses"))
                .techStack(List.of("Python", "Django", "MySQL", "React"))
                .architectureSummary("Django REST Framework backend with token auth and React frontend with interactive Recharts.")
                .build());

        // Advanced Projects
        list.add(ProjectRecommendationResponse.builder()
                .id(5L)
                .title("Full Stack E-Commerce & Order Management System")
                .tier("ADVANCED")
                .description("Production-grade online retail platform with product catalog, cart, checkout, payment gateway integration, inventory tracking, and admin dashboard.")
                .difficulty("Hard")
                .estimatedHours(45)
                .requiredSkills(List.of("Spring Boot", "React", "MySQL", "Spring Security & JWT", "Docker", "Stripe API"))
                .features(List.of("Product catalog with search, filter, pagination", "Shopping cart with Redis or session sync", "Order lifecycle (Pending, Paid, Shipped, Delivered)", "Role-based admin portal with sales metrics"))
                .techStack(List.of("Spring Boot 3", "React 18", "MySQL 8", "Docker", "Stripe"))
                .architectureSummary("Microservices-ready modular monolith with Spring Security JWT, database index optimization, and asynchronous notification handlers.")
                .build());

        list.add(ProjectRecommendationResponse.builder()
                .id(6L)
                .title("Developer Learning Management Platform (CodePath Academy)")
                .tier("ADVANCED")
                .description("The very application you are using: interactive programming curriculum, Monaco code editor, adaptive quizzes, gamification, and full-stack tracer.")
                .difficulty("Hard")
                .estimatedHours(60)
                .requiredSkills(List.of("Spring Boot", "Hibernate / JPA", "Spring Security", "React", "Monaco Editor", "MySQL"))
                .features(List.of("8-Level visual learning roadmap", "Adaptive quiz engine with post-submission explanations", "In-browser safe code runner with testcases", "XP gamification, levels, badges, streaks"))
                .techStack(List.of("Java 21", "Spring Boot 3", "MySQL", "React 18", "Tailwind CSS", "Monaco Editor"))
                .architectureSummary("Clean layered architecture with decoupled testcase execution and interactive architecture inspection mode.")
                .build());

        return list;
    }
}
