package com.target.api.target.facades.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProjectRequestDto {
    @NotEmpty(message = "Project Name Cannot Be Empty")
    @Size(max = 120,message = "Project name length max length 120 ")
    private String name;
    private String code;
}
