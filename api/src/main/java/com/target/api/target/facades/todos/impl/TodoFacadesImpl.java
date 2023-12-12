package com.target.api.target.facades.todos.impl;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.facades.request.TodoRequestDto;
import com.target.api.target.facades.todos.TodoFacades;
import com.target.api.target.mapper.TodoMapper;
import com.target.api.target.model.StatusModel;
import com.target.api.target.model.TodoModel;
import com.target.api.target.services.StatusService;
import com.target.api.target.services.TodoService;
import com.target.api.target.services.ProjectService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service("todoFacades")
public class TodoFacadesImpl implements TodoFacades {
    @Resource(name = "todoService")
    private TodoService todoService;
    @Resource(name = "projectService")
    private ProjectService projectService;
    @Resource(name = "statusService")
    private StatusService statusService;
    @Resource(name = "todoMapper")
    private TodoMapper todoMapper;
    @Override
    public List<TodoDto> getTodoList(String code) {
        List<TodoModel> todos = todoService.getTodoList(code);
        List<TodoDto> todoDtos = new ArrayList<>();
        for (TodoModel todo : todos){
            todoDtos.add(todoMapper.toMapTodoDto(todo));
        }
        return todoDtos;
    }

    @Override
    public TodoDto createTodo(TodoRequestDto todoRequestDto) {
        TodoModel todo = new TodoModel();
        todo.setCode(UUID.randomUUID().toString());
        todo.setDescription(todoRequestDto.getDescription());
        todo.setStatus(statusService.getStatusByCode(todoRequestDto.getStatus().getCode()));
        todo.setProject(projectService.getTodosByCode(todoRequestDto.getCode()));
        todo.setIsCalculated(Boolean.FALSE);
        return todoMapper.toMapTodoDto( todoService.createTodo(todo));
    }

    @Override
    public TodoDto updateTodo(TodoRequestDto todoRequestDto) {
        TodoModel existed = todoService.getTodoByCode(todoRequestDto.getCode());
        StatusModel status = statusService.getStatusByCode(todoRequestDto.getStatus().getCode());
        if (Objects.isNull(existed)){
            return null;
        }
        existed.setDescription(todoRequestDto.getDescription());
        existed.setStatus(status);
        existed.setIsCalculated(Boolean.FALSE);

        return todoMapper.toMapTodoDto(todoService.updateTodo(existed));
    }

    @Override
    public Boolean deleteTodo(TodoRequestDto todoRequestDto) {
        TodoModel existed = todoService.getTodoByCode(todoRequestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        todoService.deleteTodo(existed);
        return true;
    }
}
