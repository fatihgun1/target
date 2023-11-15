package com.target.api.target.facades.request;

import lombok.Data;

@Data
public class TodosRequestDto {
    private String owner;
    private String name;
    private String code;
}
