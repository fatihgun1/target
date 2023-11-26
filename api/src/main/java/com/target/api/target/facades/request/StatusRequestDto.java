package com.target.api.target.facades.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusRequestDto {
    @NotEmpty(message = "Status name cannot be empty")
    private String name;
    private String todoscode;
    private String code;
    @Digits(integer = 3,fraction = 2,message = "Score should be number")
    @NotNull(message = "Score cannot be empty")
    private Long score;
}
