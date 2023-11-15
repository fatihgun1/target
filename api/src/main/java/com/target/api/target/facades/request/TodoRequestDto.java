package com.target.api.target.facades.request;

import lombok.Data;

@Data
public class TodoRequestDto {
    private String code;
    private String description;
    private String status;
}
