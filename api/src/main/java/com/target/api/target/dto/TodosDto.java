package com.target.api.target.dto;

import lombok.Data;

import java.util.List;

@Data
public class TodosDto {
    private String name;
    private String code;
    private List<TodoDto> todos;
    private List<String> status;
    private String owner;

    public TodosDto() {
    }

    public TodosDto(List<TodoDto> todos, List<String> status,String owner,String name,String code) {
        this.todos = todos;
        this.status = status;
        this.owner = owner;
        this.name = name;
        this.code = code;
    }


}
