package com.target.api.target.services;


import com.target.api.target.model.TodoModel;

import java.util.List;

public interface TodoService {
    TodoModel getTodoByCode(String code);
    List<TodoModel> getTodoList(String name);
    TodoModel createTodo(TodoModel todoModel);
    TodoModel updateTodo(TodoModel todoModel);
    void deleteTodo(TodoModel todoModel);
    List<Long> findTodoPoints(String code);
}
