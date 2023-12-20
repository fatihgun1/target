package com.target.api.target.facades.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContainerRequestDto {
    private String code;
    @NotEmpty(message = "Container Name Cannot Be Empty")
    @Size(max = 60,message = "Container name length max length 120")
    private String name;
}
