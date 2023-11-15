package com.target.api.target.repository;

import com.target.api.target.model.TodoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoModel,Long> {
    TodoModel findByCode(String code);
}
