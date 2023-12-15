package com.target.api.target.dto;

import lombok.Data;

import java.util.List;

@Data
public class MarketPageableDto {
    private Integer totalPage;
    private Integer pageSize;
    private Integer currentPage;
    private List<MarketEntryDto> entries;

}
