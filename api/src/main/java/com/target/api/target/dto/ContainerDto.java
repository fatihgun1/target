package com.target.api.target.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContainerDto {
    private String code;
    private String name;
    private List<StatusDto> status;
    private List<BadgeDto> badges;
    private Boolean isPublished;
}
