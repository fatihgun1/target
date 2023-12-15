package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "statusentry")
public class StatusEntryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String name;
    private String code;
    private Long score;

    @ManyToOne
    @JoinColumn(name = "marketEntry_pk")
    private MarketEntryModel marketEntry;

}
