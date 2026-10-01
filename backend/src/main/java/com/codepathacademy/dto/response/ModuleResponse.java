package com.codepathacademy.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModuleResponse {
    private Long id;
    private Long courseId;
    private String title;
    private String description;
    private Integer moduleOrder;
    private List<TopicResponse> topics;
}
