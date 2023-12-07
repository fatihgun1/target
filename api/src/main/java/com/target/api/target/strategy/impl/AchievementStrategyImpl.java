package com.target.api.target.strategy.impl;

import com.target.api.target.model.AchievementModel;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.services.AchievementService;
import com.target.api.target.strategy.AchievementStrategy;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service("achievementStrategy")
public class AchievementStrategyImpl implements AchievementStrategy {
    @Resource(name = "achievementService")
    private AchievementService achievementService;

    public void createAchievement(ProjectModel todos){
        AchievementModel achievement = new AchievementModel();
        achievement.setCode(UUID.randomUUID().toString());
        achievement.setName(todos.getName());
        achievement.setTotalScore(0L);
        achievement.setOwner(todos.getOwner());
        achievement.setTodosCode(todos.getCode());
        achievementService.createAchievement(achievement);
    }

    @Override
    public Boolean updateAchievement(ProjectModel todos) {
        AchievementModel achievement = achievementService.getAchievementByTodosCode(todos.getCode());
        if (Objects.isNull(achievement)){
            return false;
        }
        achievement.setName(todos.getName());
        achievementService.updateAchievement(achievement);
        return true;
    }

    @Override
    public Boolean deleteAchievement(String todosCode) {
        AchievementModel achievement = achievementService.getAchievementByTodosCode(todosCode);
        if (Objects.isNull(achievement)){
            return false;
        }
        achievementService.deleteAchievement(achievement);
        return true;
    }
}
