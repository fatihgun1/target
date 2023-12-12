package com.target.api.target.facades.project.impl;

import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.ProjectRequestDto;
import com.target.api.target.facades.project.ProjectFacades;
import com.target.api.target.mapper.ProjectMapper;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.services.ProjectService;
import com.target.api.target.strategy.AchievementStrategy;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;


import java.util.*;

@Service("projectFacades")
public class ProjectFacadesImpl implements ProjectFacades {
    @Resource(name = "projectService")
    private ProjectService projectService;
    @Resource(name = "projectMapper")
    private ProjectMapper projectMapper;

    @Resource(name = "achievementStrategy")
    private AchievementStrategy achievementStrategy;

    @Override
    public List<ProjectDto> getProjectByOwner(String owner) {
        return projectMapper.toMapProjectList(projectService.getTodosByOwner(owner));
    }

    @Override
    public ProjectDto getProjectByCode(String code) {
        return projectMapper.toMapProjectDto(projectService.getTodosByCode(code));
    }

    @Override
    public void createProject(ProjectRequestDto requestDto) {
        final ProjectModel todosModel = new ProjectModel();
        todosModel.setCode(UUID.randomUUID().toString());
        todosModel.setName(requestDto.getName());
        todosModel.setOwner(requestDto.getOwner());
        projectService.createTodoList(todosModel);
        achievementStrategy.createAchievement(todosModel);
    }

    @Override
    public Boolean updateProject(ProjectRequestDto requestDto) {
        ProjectModel existed = projectService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        existed.setName(requestDto.getName());
        projectService.updateProject(existed);
        achievementStrategy.updateAchievement(existed);
        return true;
    }

    @Override
    public Boolean deleteProject(ProjectRequestDto requestDto) {
        ProjectModel existed = projectService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        projectService.deleteTodoList(existed);
        achievementStrategy.deleteAchievement(requestDto.getCode());
        return true;
    }
}
