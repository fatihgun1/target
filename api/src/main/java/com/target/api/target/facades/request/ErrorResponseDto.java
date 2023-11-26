package com.target.api.target.facades.request;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ErrorResponseDto {
    private String message;
    private HttpStatus status;
}
