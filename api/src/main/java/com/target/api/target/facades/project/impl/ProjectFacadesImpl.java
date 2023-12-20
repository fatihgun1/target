package com.target.api.target.facades.project.impl;

import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.ProjectRequestDto;
import com.target.api.target.facades.project.ProjectFacades;
import com.target.api.target.mapper.ProjectMapper;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.services.ProjectService;
import com.target.api.target.strategy.AchievementStrategy;
import com.target.api.target.util.CurrentUser;
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
    public List<ProjectDto> getProjectByOwner() {
        return projectMapper.toMapProjectList(projectService.getTodosByOwner(CurrentUser.resolve()));
    }

    @Override
    public ProjectDto getProjectByCode(String code) {
        return projectMapper.toMapProjectDto(projectService.getTodosByCode(code));
    }

    @Override
    public ProjectDto createProject(ProjectRequestDto requestDto) {
        final ProjectModel todosModel = new ProjectModel();
        todosModel.setCode(UUID.randomUUID().toString());
        todosModel.setName(requestDto.getName());
        todosModel.setOwner(CurrentUser.resolve());
        achievementStrategy.createAchievement(todosModel);
        return projectMapper.toMapProjectDto(projectService.createProject(todosModel));
    }

    @Override
    public ProjectDto updateProject(ProjectRequestDto requestDto) {
        ProjectModel existed = projectService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return null;
        }
        existed.setName(requestDto.getName());
        existed.setOwner(CurrentUser.resolve());
        achievementStrategy.updateAchievement(existed);
        return projectMapper.toMapProjectDto(projectService.updateProject(existed));
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
