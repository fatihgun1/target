package com.target.api.target.services;

import com.target.api.target.model.TodosModel;

import java.util.List;

public interface TodosService {
    List<TodosModel> getTodosByOwner(String owner);

    TodosModel getTodosByCode(String name);
    void createTodoList(TodosModel todosDto);
    void updateTodoList(TodosModel todosDto);
    void deleteTodoList(TodosModel todosDto);
}
