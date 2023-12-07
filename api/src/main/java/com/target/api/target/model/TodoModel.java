package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="todo")
public class TodoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String code;
    private String description;
    @Column(name = "is_calculated")
    private Boolean isCalculated;

    @ManyToOne
    @JoinColumn(name = "project_pk")
    private ProjectModel project;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "status_pk")
    private StatusModel status;
}
