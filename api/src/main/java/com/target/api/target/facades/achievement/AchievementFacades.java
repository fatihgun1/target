package com.target.api.target.facades.achievement;

import com.target.api.target.dto.AchievementDto;
import com.target.api.target.facades.request.AchievementRequestDto;

import java.util.List;

public interface AchievementFacades {

    List<AchievementDto> getAchievementByOwner();
    AchievementDto calculate(String code);
}
