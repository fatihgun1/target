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
    private String owner;

    @OneToMany(mappedBy = "todos",cascade = CascadeType.DETACH)
    private List<TodoModel> todos;

    @OneToMany(mappedBy = "todos",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<StatusModel> status;

}
