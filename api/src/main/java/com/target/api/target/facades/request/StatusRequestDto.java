package com.target.api.target.facades.request;

import lombok.Data;

@Data
public class StatusRequestDto {
    private String name;
    private String todoscode;
    private String code;
    private Long score;
}
