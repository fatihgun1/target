package com.target.api.target.facades.todos;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.facades.request.TodoRequestDto;
import java.util.List;

public interface TodoFacade {
    List<TodoDto> getTodoList(String code);
    void createTodo(TodoRequestDto todoRequestDto);
    Boolean updateTodo(TodoRequestDto todoRequestDto);
    Boolean deleteTodo(TodoRequestDto todoRequestDto);
}
