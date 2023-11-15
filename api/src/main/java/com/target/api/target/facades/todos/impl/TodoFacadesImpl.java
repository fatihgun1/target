package com.target.api.target.facades.todos.impl;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.facades.request.TodoRequestDto;
import com.target.api.target.facades.todos.TodoFacade;
import com.target.api.target.mapper.TodoMapper;
import com.target.api.target.model.TodoModel;
import com.target.api.target.services.TodoService;
import com.target.api.target.services.TodosService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service("todoFacades")
public class TodoFacadesImpl implements TodoFacade {
    @Resource(name = "todoService")
    private TodoService todoService;
    @Resource(name = "todosService")
    private TodosService todosService;
    @Resource(name = "todoMapper")
    private TodoMapper todoMapper;
    @Override
    public List<TodoDto> getTodoList(String code) {
        List<TodoModel> todos = todoService.getTodoList(code);
        List<TodoDto> todoDtos = new ArrayList<>();
        for (TodoModel todo : todos){
            todoDtos.add(todoMapper.toTodoDto(todo));
        }
        return todoDtos;
    }

    @Override
    public void createTodo(TodoRequestDto todoRequestDto) {
        TodoModel todo = new TodoModel();
        todo.setCode(UUID.randomUUID().toString());
        todo.setDescription(todoRequestDto.getDescription());
        todo.setStatus(todoRequestDto.getStatus());
        todo.setTodos(todosService.getTodosByCode(todoRequestDto.getCode()));
        todoService.createTodo(todo);
    }

    @Override
    public Boolean updateTodo(TodoRequestDto todoRequestDto) {
        TodoModel existed = todoService.getTodoByCode(todoRequestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        existed.setDescription(todoRequestDto.getDescription());
        existed.setStatus(todoRequestDto.getStatus());
        todoService.updateTodo(existed);
        return true;
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
