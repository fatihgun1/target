package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "badge")
public class BadgeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String code;
    private String name;
    private String description;
    private String owner;
    private Long score;
    @Column(length = 1000)
    private String mediaUrl;

}
