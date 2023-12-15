package com.target.api.target.dto;

import lombok.Data;

import java.util.List;

@Data
public class MarketEntryDto {
    private String code;
    private String name;
    private String owner;
    private List<StatusEntryDto> status;
    private List<BadgeEntryDto> badges;
}
