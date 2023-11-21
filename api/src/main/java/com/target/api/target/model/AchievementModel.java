package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "achievement")
public class AchievementModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String name;
    private String code;
    private String owner;
    private String todosCode;
    private Long totalScore;

}
