package com.target.api.target.facades.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class BadgeRequestDto {
    private String code;
    @NotEmpty(message = "Badge name cannot be empty")
    private String name;
    @NotEmpty(message = "Badge description cannot be empty")
    private String description;
    private String owner;
    @Pattern(regexp = "\\d+",message = "Score should be number")
    @NotEmpty(message = "Badge score cannot be empty")
    private String score;
    @NotEmpty(message = "Badge media cannot be empty")
    private String mediaUrl;
}
