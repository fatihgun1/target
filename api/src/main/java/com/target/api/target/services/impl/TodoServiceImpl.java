package com.target.api.target.services.impl;

import com.target.api.target.model.TodoModel;
import com.target.api.target.repository.TodoRepository;
import com.target.api.target.repository.ProjectRepository;
import com.target.api.target.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("todoService")
public class TodoServiceImpl implements TodoService {
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Override
    public TodoModel getTodoByCode(String code) {
        return todoRepository.findByCode(code);
    }

    @Override
    public List<TodoModel> getTodoList(String code) {
        return projectRepository.findByCode(code).getTodos();
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

    @Override
    public List<Long> findTodoPoints(String code) {
        return null;
    }
}
