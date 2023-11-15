package com.target.api.target.services.impl;

import com.target.api.target.model.TodoModel;
import com.target.api.target.repository.TodoRepository;
import com.target.api.target.repository.TodosRepository;
import com.target.api.target.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("todoService")
public class TodoServiceImpl implements TodoService {
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private TodosRepository todosRepository;
    @Override
    public TodoModel getTodoByCode(String code) {
        return todoRepository.findByCode(code);
    }

    @Override
    public List<TodoModel> getTodoList(String code) {
        return todosRepository.findByCode(code).getTodos();
    }

    @Override
    public void createTodo(TodoModel todoModel) {
        todoRepository.save(todoModel);
    }

    @Override
    public void updateTodo(TodoModel todoModel) {
        todoRepository.save(todoModel);
    }

    @Override
    public void deleteTodo(TodoModel todoModel) {
        todoRepository.delete(todoModel);
    }
}
