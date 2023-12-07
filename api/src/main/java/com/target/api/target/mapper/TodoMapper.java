package com.target.api.target.mapper;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.model.TodoModel;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("todoMapper")
public class TodoMapper {
    @Resource(name = "statusMapper")
    private StatusMapper statusMapper;
    public TodoDto toTodoDto(TodoModel source) {
        TodoDto target = new TodoDto();
        target.setCode(source.getCode());
        target.setDescription(source.getDescription());
        target.setStatus(statusMapper.toMapStatusDto(source.getStatus()));
        return target;
    }
}
