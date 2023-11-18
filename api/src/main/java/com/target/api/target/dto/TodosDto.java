package com.target.api.target.dto;

import lombok.Data;

import java.util.List;

@Data
public class TodosDto {
    private String name;
    private String code;
    private List<TodoDto> todos;
    private List<StatusDto> status;
    private String owner;


}
