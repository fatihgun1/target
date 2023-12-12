package com.target.api.target.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.target.api.target.config.VIEW;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto {
    @JsonView(VIEW.BASE.class)
    private String name;
    @JsonView(VIEW.BASE.class)
    private String code;
    private List<TodoDto> todos;
    private List<StatusDto> status;
    private ContainerDto container;
    private String owner;

}
