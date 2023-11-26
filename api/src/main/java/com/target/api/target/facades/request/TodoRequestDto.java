package com.target.api.target.facades.request;

import com.target.api.target.dto.StatusDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class TodoRequestDto {
    private String code;
    @NotEmpty(message = "Task description cannot be empty")
    private String description;
    @Valid
    private StatusDto status;
}
