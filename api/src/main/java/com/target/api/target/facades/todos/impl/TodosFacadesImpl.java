package com.target.api.target.facades.todos.impl;

import com.target.api.target.dto.TodosDto;
import com.target.api.target.facades.request.TodosRequestDto;
import com.target.api.target.facades.todos.TodosFacades;
import com.target.api.target.mapper.TodosMapper;
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

    @Override
    public List<TodosDto> getTodosByOwner(String owner) {
        List<TodosModel> todos = todosService.getTodosByOwner(owner);
        List<TodosDto> todosDto = new ArrayList<>();
        for (TodosModel todo : todos){
            todosDto.add(todosMapper.toTodosDto(todo));
        }
        return todosDto;
    }

    @Override
    public void createTodoList(TodosRequestDto requestDto) {
        final TodosModel todosModel = new TodosModel();
        todosModel.setCode(UUID.randomUUID().toString());
        todosModel.setName(requestDto.getName());
        todosModel.setOwner(requestDto.getOwner());
        todosModel.setStatus(Arrays.asList("Not Start","On Going","Done"));
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
