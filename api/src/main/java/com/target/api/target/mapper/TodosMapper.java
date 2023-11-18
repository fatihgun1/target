package com.target.api.target.mapper;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.dto.TodosDto;
import com.target.api.target.model.TodoModel;
import com.target.api.target.model.TodosModel;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("todosMapper")
public class TodosMapper {

    public TodosDto toTodosDto(TodosModel source){
        TodosDto target = new TodosDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setOwner(source.getOwner());
        return target;
    }
}
