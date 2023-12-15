package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "badgeentry")
public class BadgeEntryModel {
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
    @ManyToOne
    @JoinColumn(name = "marketEntry_pk")
    private MarketEntryModel marketEntry;
}
