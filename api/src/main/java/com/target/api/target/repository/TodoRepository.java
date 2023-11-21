package com.target.api.target.repository;

import com.target.api.target.model.TodoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoModel,Long> {
    TodoModel findByCode(String code);
}
