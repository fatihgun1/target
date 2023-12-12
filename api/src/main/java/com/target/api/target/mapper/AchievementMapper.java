package com.target.api.target.mapper;

import com.target.api.target.dto.AchievementDto;
import com.target.api.target.model.AchievementModel;
import org.springframework.stereotype.Service;

@Service("achievementMapper")
public class AchievementMapper {

    public AchievementDto toAchievementDto(AchievementModel source){
        AchievementDto target = new AchievementDto();
        target.setName(source.getName());
        target.setTotalScore(String.valueOf(source.getTotalScore()));
        target.setCode(source.getProject());
        return target;
    }
}
