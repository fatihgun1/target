package com.target.api.target.services.impl;

import com.target.api.target.model.AchievementModel;
import com.target.api.target.repository.AchievementRepository;
import com.target.api.target.services.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("achievementService")
public class AchievementServiceImpl implements AchievementService {

    @Autowired
    private AchievementRepository achievementRepository;
    @Override
    public AchievementModel getAchievement(String code) {
        return achievementRepository.findByCode(code);
    }

    @Override
    public AchievementModel getAchievementByTodosCode(String code) {
        return achievementRepository.findByTodosCode(code);
    }

    @Override
    public List<AchievementModel> getAchievementByOwner(String owner) {
        return achievementRepository.findByOwner(owner);
    }

    @Override
    public void createAchievement(AchievementModel achievement) {
        achievementRepository.save(achievement);
    }

    @Override
    public void updateAchievement(AchievementModel achievement) {
        achievementRepository.save(achievement);
    }

    @Override
    public void deleteAchievement(AchievementModel achievement) {
        achievementRepository.delete(achievement);
    }

    @Override
    public List<Object[]> findTodoPoints(String code) {
        return achievementRepository.findScore(code);
    }
}
