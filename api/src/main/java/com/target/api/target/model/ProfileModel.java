package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profile")
public class ProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String fullName;
    private String title;
    private String profileScore;
    @Column(length = 1000)
    private String mediaUrl;
    @Column(length = 5000)
    private String bio;
    private String owner;

}
