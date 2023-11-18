package com.target.api.target.facades.todos.impl;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.dto.TodosDto;
import com.target.api.target.facades.request.TodosRequestDto;
import com.target.api.target.facades.todos.TodosFacades;
import com.target.api.target.mapper.StatusMapper;
import com.target.api.target.mapper.TodoMapper;
import com.target.api.target.mapper.TodosMapper;
import com.target.api.target.model.StatusModel;
import com.target.api.target.model.TodoModel;
import com.target.api.target.model.TodosModel;
import com.target.api.target.services.TodosService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;


import java.util.*;

@Service("todosFacades")
public class TodosFacadesImpl implements TodosFacades {
    @Resource(name = "todosService")
    private TodosService todosService;
    @Resource(name = "todosMapper")
    private TodosMapper todosMapper;
    @Resource(name = "statusMapper")
    private StatusMapper statusMapper;
    @Resource(name = "todoMapper")
    private TodoMapper todoMapper;

    @Override
    public List<TodosDto> getTodosByOwner(String owner) {
        List<TodosModel> todos = todosService.getTodosByOwner(owner);
        List<TodosDto> todosDto = new ArrayList<>();

        for (TodosModel todo : todos){
            TodosDto dto = todosMapper.toTodosDto(todo);
            todosDto.add(dto);
        }

        return todosDto;
    }

    @Override
    public TodosDto getTodosByCode(String code) {
        TodosModel todosModel = todosService.getTodosByCode(code);
        TodosDto todoList = todosMapper.toTodosDto(todosModel);
        todoList.setStatus(statusMapper.toMapStatusList(todosModel.getStatus()));
        List<TodoDto> todoDtos = new ArrayList<>();
        for (TodoModel todo : todosModel.getTodos()){
            todoDtos.add(todoMapper.toTodoDto(todo));
        }
        todoList.setTodos(todoDtos);
        return todoList;
    }

    @Override
    public void createTodoList(TodosRequestDto requestDto) {
        final TodosModel todosModel = new TodosModel();
        todosModel.setCode(UUID.randomUUID().toString());
        todosModel.setName(requestDto.getName());
        todosModel.setOwner(requestDto.getOwner());
        todosService.createTodoList(todosModel);
    }

    @Override
    public Boolean updateTodoList(TodosRequestDto requestDto) {
        TodosModel existed = todosService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        existed.setName(requestDto.getName());
        todosService.updateTodoList(existed);
        return true;
    }

    @Override
    public Boolean deleteTodoList(TodosRequestDto requestDto) {
        TodosModel existed = todosService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        todosService.deleteTodoList(existed);
        return true;
    }
}
