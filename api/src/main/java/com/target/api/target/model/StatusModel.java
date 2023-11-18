package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "status")
public class StatusModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String name;
    private String code;
    private Long score;

    @Column(name = "is_calculated")
    private Boolean isCalculated;

    @ManyToOne
    @JoinColumn(name = "todos_pk")
    private TodosModel todos;


}
