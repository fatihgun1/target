package com.target.api.target.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatusDto {
    private String name;
    private String code;
    private Long score;
    private String container;
}
