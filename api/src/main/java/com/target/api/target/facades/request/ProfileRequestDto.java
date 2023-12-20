package com.target.api.target.facades.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ProfileRequestDto {
    @NotEmpty(message = "Name cannot be empty")
    private String fullName;
    @NotEmpty(message = "Job description cannot be empty")
    private String title;
    @NotEmpty(message = "Media url cannot be empty")
    private String mediaUrl;
    @NotEmpty(message = "Bio cannot be empty")
    private String bio;
}
