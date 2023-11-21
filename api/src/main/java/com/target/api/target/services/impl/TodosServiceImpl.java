package com.target.api.target.services.impl;

import com.target.api.target.model.TodosModel;
import com.target.api.target.repository.TodosRepository;
import com.target.api.target.services.TodosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("todosService")
public class TodosServiceImpl implements TodosService {
    @Autowired
    private TodosRepository todosRepository;

    @Override
    public List<TodosModel> getTodosByOwner(String owner) {
        return todosRepository.findByOwner(owner);
    }

    @Override
    public TodosModel getTodosByCode(String name) {
        return todosRepository.findByCode(name);
    }

    @Override
    public void createTodoList(TodosModel todosModel) {
        todosRepository.save(todosModel);
    }

    @Override
    public void updateTodoList(TodosModel todosModel) {
         todosRepository.save(todosModel);
    }

    @Override
    public void deleteTodoList(TodosModel todosModel) {
         todosRepository.delete(todosModel);
    }


}
