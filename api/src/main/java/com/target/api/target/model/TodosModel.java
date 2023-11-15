package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "todos")
public class TodosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String name;
    private String code;
    @OneToMany(mappedBy = "todos")
    private List<TodoModel> todos;
    private List<String> status;
    private String owner;
}
