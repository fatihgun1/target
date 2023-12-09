package com.target.api.target.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BadgeDto {
    private String code;
    private String name;
    private String description;
    private String score;
    private String mediaUrl;
    private Boolean isDeserved;
}
