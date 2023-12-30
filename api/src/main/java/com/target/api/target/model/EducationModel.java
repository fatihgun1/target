package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "education")
public class EducationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String code;
    private String name;
    private String noteBookCode;
    private String owner;
}
