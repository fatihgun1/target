package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "container")
public class ContainerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String code;
    private String name;

    @OneToMany(mappedBy = "container",cascade = CascadeType.DETACH,orphanRemoval = true)
    private List<StatusModel> status;
    @OneToMany(mappedBy = "container",cascade = CascadeType.DETACH,orphanRemoval = true)
    private List<BadgeModel> badge;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "pack_pk")
    private PackModel pack;
}
