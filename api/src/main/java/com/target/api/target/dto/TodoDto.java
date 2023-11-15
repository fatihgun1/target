package com.target.api.target.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class TodoDto {

    private String description;
    private String status;
    private String code;
    public TodoDto() {
    }

    public TodoDto(String description, String status,String code) {
        this.description = description;
        this.status = status;
        this.code = code;
    }


}
