package com.target.api.target.facades.todos;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.facades.request.TodoRequestDto;
import java.util.List;

public interface TodoFacades {
    List<TodoDto> getTodoList(String code);
    TodoDto createTodo(TodoRequestDto todoRequestDto);
    TodoDto updateTodo(TodoRequestDto todoRequestDto);
    Boolean deleteTodo(TodoRequestDto todoRequestDto);
}
