package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "pack")
public class PackModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @OneToMany(mappedBy = "pack",cascade = CascadeType.DETACH,orphanRemoval = true)
    private List<ContainerModel> containers;

    private String owner;

}
