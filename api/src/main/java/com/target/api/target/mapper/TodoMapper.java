package com.target.api.target.mapper;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.dto.TodosDto;
import com.target.api.target.model.TodoModel;
import com.target.api.target.model.TodosModel;
import org.springframework.stereotype.Service;

@Service("todoMapper")
public class TodoMapper {
    public TodoDto toTodoDto(TodoModel todo){
       return new TodoDto(todo.getDescription(),todo.getStatus(),todo.getCode());
    }
}
