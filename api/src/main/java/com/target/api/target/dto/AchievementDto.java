package com.target.api.target.dto;

import lombok.Data;

import java.util.List;

@Data
public class AchievementDto {
    private String name;
    private String totalScore;
    private String code;
    private List<BadgeDto> badges;
}
