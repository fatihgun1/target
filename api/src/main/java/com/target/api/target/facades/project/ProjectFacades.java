package com.target.api.target.facades.project;

import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.TodosRequestDto;

import java.util.List;

public interface ProjectFacades {
    List<ProjectDto> getTodosByOwner(String owner);
    ProjectDto getTodosByCode(String code);
    void createTodoList(TodosRequestDto requestDto);
    Boolean updateTodoList(TodosRequestDto requestDto);
    Boolean deleteTodoList(TodosRequestDto requestDto);
}
