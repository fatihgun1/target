package com.target.api.target.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class TodoDto {

    private String description;
    private StatusDto status;
    private String code;

}
