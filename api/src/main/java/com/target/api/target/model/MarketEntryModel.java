package com.target.api.target.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "marketEntry")
public class MarketEntryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    private String code;
    private String name;
    private String owner;

    @OneToMany(mappedBy = "marketEntry",cascade = CascadeType.DETACH,orphanRemoval = true)
    private List<StatusEntryModel> statusEntry;
    @OneToMany(mappedBy = "marketEntry",cascade = CascadeType.DETACH,orphanRemoval = true)
    private List<BadgeEntryModel> badgeEntry;

}
