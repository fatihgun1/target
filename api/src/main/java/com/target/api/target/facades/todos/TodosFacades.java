package com.target.api.target.facades.todos;

import com.target.api.target.dto.TodosDto;
import com.target.api.target.facades.request.TodosRequestDto;

import java.util.List;

public interface TodosFacades {
    List<TodosDto> getTodosByOwner(String owner);
    void createTodoList(TodosRequestDto requestDto);
    Boolean updateTodoList(TodosRequestDto requestDto);
    Boolean deleteTodoList(TodosRequestDto requestDto);
}
