package com.target.api.target.repository;

import com.target.api.target.model.TodosModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodosRepository extends JpaRepository<TodosModel,Long> {
    List<TodosModel> findByOwner(String owner);
    TodosModel findByCode(String code);

}
