package com.target.api.target.dto;

import lombok.Data;

@Data
public class BadgeEntryDto {
    private String code;
    private String name;
    private String description;
    private String owner;
    private Long score;
    private String mediaUrl;
}
