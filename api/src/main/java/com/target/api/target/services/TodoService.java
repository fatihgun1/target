package com.target.api.target.services;


import com.target.api.target.model.TodoModel;

import java.util.List;

public interface TodoService {
    TodoModel getTodoByCode(String code);
    List<TodoModel> getTodoList(String name);
    void createTodo(TodoModel todoModel);
    void updateTodo(TodoModel todoModel);
    void deleteTodo(TodoModel todoModel);
    List<Long> findTodoPoints(String code);
}
