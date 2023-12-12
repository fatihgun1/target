package com.target.api.target.facades.achievement.impl;

import com.target.api.target.dto.AchievementDto;
import com.target.api.target.dto.BadgeDto;
import com.target.api.target.facades.achievement.AchievementFacades;
import com.target.api.target.facades.request.AchievementRequestDto;
import com.target.api.target.mapper.AchievementMapper;
import com.target.api.target.mapper.BadgeMapper;
import com.target.api.target.model.AchievementModel;
import com.target.api.target.model.TodoModel;
import com.target.api.target.services.AchievementService;
import com.target.api.target.services.ProjectService;
import com.target.api.target.services.TodoService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service("achievementFacades")
public class AchievementFacadesImpl implements AchievementFacades {
    @Resource(name = "achievementService")
    private AchievementService achievementService;
    @Resource(name = "achievementMapper")
    private AchievementMapper achievementMapper;
    @Resource(name = "badgeMapper")
    private BadgeMapper badgeMapper;
    @Resource(name = "todoService")
    private TodoService todoService;
    @Resource(name = "projectService")
    private ProjectService projectService;

    @Override
    public List<AchievementDto> getAchievementByOwner(String owner) {
        List<AchievementModel> achievements = achievementService.getAchievementByOwner(owner);
        List<AchievementDto> achievementDtos = new ArrayList<>();
        for (AchievementModel achievement : achievements) {
            AchievementDto achievementDto = achievementMapper.toAchievementDto(achievement);
            achievementDto.setBadges(this.calculateDeserved(achievement));
            achievementDtos.add(achievementDto);
        }
        return achievementDtos;
    }

    @Override
    public AchievementDto calculate(AchievementRequestDto request) {
        List<Object[]> response = achievementService.findTodoPoints(request.getCode());
        AchievementModel achievement = achievementService.getAchievementByTodosCode(request.getCode());
        if(response.isEmpty()){
            return achievementMapper.toAchievementDto(achievement);
        }
        Long total = achievement.getTotalScore();

        for (int i = 0; i < response.size(); i++) {
            Object[] single = response.get(i);
            if (Objects.nonNull(single) && single.length != 0) {

                Long point = (Long) single[1];
                total = total + point;

                String todoCode = (String) single[0];
                this.updateTodo(todoCode);
            }
        }
        achievement.setTotalScore(total);
        achievementService.updateAchievement(achievement);
        return achievementMapper.toAchievementDto(achievement);
    }

    private void updateTodo(String code) {
        TodoModel todo = todoService.getTodoByCode(code);
        todo.setIsCalculated(Boolean.TRUE);
        todoService.updateTodo(todo);
    }

    private List<BadgeDto> calculateDeserved(AchievementModel achievement) {

        List<BadgeDto> badges = badgeMapper.toBadgeDtoList(projectService.getBadgesByProject(achievement.getProject()));
        for (BadgeDto badge : badges) {
            if (achievement.getTotalScore() >= Long.parseLong(badge.getScore())) {
                badge.setIsDeserved(Boolean.TRUE);
            } else {
                badge.setIsDeserved(Boolean.FALSE);
            }
        }
        return badges;
    }
}
