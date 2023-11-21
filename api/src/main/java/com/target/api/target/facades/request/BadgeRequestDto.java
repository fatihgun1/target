package com.target.api.target.facades.request;

import lombok.Data;

@Data
public class BadgeRequestDto {
    private String code;
    private String name;
    private String description;
    private String owner;
    private String score;
    private String mediaUrl;
}
