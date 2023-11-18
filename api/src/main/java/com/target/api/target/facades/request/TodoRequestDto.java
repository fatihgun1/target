package com.target.api.target.facades.request;

import com.target.api.target.dto.StatusDto;
import lombok.Data;

@Data
public class TodoRequestDto {
    private String code;
    private String description;
    private StatusDto status;
}
