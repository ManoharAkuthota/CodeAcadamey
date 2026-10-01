package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewQuestionResponse {
    private String category; // C, C++, Java, Python, JavaScript, SQL, Spring Boot, React
    private String level; // Beginner, Intermediate, Advanced, Scenario
    private String question;
    private String answer;
    private String codeSnippet;
    private List<String> keyPoints;
}
