package com.target.api.target.mapper;

import com.target.api.target.dto.TodosDto;
import com.target.api.target.model.TodosModel;
import org.springframework.stereotype.Service;

@Service("todosMapper")
public class TodosMapper {
    public static TodosDto toTodosDto(TodosModel todos){
        todos.getTodos();
    }
}
