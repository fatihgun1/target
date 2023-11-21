package com.target.api.target.services;

import com.target.api.target.model.AchievementModel;

import java.util.List;

public interface AchievementService {
    AchievementModel getAchievement(String code);
    AchievementModel getAchievementByTodosCode(String code);
    List<AchievementModel> getAchievementByOwner(String owner);
    void createAchievement(AchievementModel achievement);
    void updateAchievement(AchievementModel achievement);
    void deleteAchievement(AchievementModel achievement);
    List<Object[]> findTodoPoints(String code);

}
