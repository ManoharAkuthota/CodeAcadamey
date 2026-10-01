package com.codepathacademy.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeSubmitRequest {
    @NotBlank(message = "Code cannot be empty")
    private String code;
    private String language;
}
