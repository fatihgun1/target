package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "project")
public class ProjectModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String name;
    private String code;
    private String owner;

    @OneToMany(mappedBy = "project",cascade = CascadeType.DETACH,orphanRemoval = true)
    private List<TodoModel> todos;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "container_pk")
    private ContainerModel container;

}
