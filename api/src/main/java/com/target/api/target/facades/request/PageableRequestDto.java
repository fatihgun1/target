package com.target.api.target.facades.request;

import lombok.Data;

@Data
public class PageableRequestDto {
    private Integer current;
    private Integer pageSize;
}
