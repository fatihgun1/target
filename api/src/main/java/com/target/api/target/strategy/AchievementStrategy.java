package com.target.api.target.strategy;

import com.target.api.target.model.ProjectModel;

public interface AchievementStrategy {
    void createAchievement(ProjectModel todos);
    Boolean updateAchievement(ProjectModel todos);
    Boolean deleteAchievement(String todosCode);

}
