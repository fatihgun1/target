package com.target.api.target.dto;

import lombok.Data;

@Data
public class BadgeDto {
    private String code;
    private String name;
    private String description;
    private String score;
    private String mediaUrl;
    private Boolean isDeserved;
}
