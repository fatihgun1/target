package com.target.api.target.strategy;

import com.target.api.target.model.TodosModel;

public interface AchievementStrategy {
    void createAchievement(TodosModel todos);
    Boolean updateAchievement(TodosModel todos);
    Boolean deleteAchievement(String todosCode);

}
