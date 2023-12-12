package com.target.api.target.mapper;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.model.TodoModel;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service("todoMapper")
public class TodoMapper {
    @Resource(name = "statusMapper")
    private StatusMapper statusMapper;
    public TodoDto toMapTodoDto(TodoModel source) {
        TodoDto target = new TodoDto();
        target.setCode(source.getCode());
        target.setDescription(source.getDescription());
        target.setStatus(statusMapper.toMapStatusDto(source.getStatus()));
        return target;
    }

    public List<TodoDto> toMapTodoDtoList(List<TodoModel> source){
        if (Objects.isNull(source)){
            return Collections.emptyList();
        }
        List<TodoDto> target = new ArrayList<>();
        for (TodoModel todo : source){
            target.add(this.toMapTodoDto(todo));
        }
        return target;
    }
}
