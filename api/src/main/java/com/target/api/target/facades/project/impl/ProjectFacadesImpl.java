package com.target.api.target.facades.project.impl;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.TodosRequestDto;
import com.target.api.target.facades.project.ProjectFacades;
import com.target.api.target.mapper.StatusMapper;
import com.target.api.target.mapper.TodoMapper;
import com.target.api.target.mapper.ProjectMapper;
import com.target.api.target.model.TodoModel;
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
    @Resource(name = "statusMapper")
    private StatusMapper statusMapper;
    @Resource(name = "todoMapper")
    private TodoMapper todoMapper;
    @Resource(name = "achievementStrategy")
    private AchievementStrategy achievementStrategy;

    @Override
    public List<ProjectDto> getTodosByOwner(String owner) {
        List<ProjectModel> todos = projectService.getTodosByOwner(owner);
        List<ProjectDto> todosDto = new ArrayList<>();

        for (ProjectModel todo : todos){
            ProjectDto dto = projectMapper.toTodosDto(todo);
            todosDto.add(dto);
        }

        return todosDto;
    }

    @Override
    public ProjectDto getTodosByCode(String code) {
        ProjectModel todosModel = projectService.getTodosByCode(code);
        ProjectDto todoList = projectMapper.toTodosDto(todosModel);
        //todoList.setStatus(statusMapper.toMapStatusList(todosModel.getStatus()));
        List<TodoDto> todoDtos = new ArrayList<>();
        /*
        for (TodoModel todo : todosModel.getTodos()){
            todoDtos.add(todoMapper.toTodoDto(todo));
        }
         */
        todoList.setTodos(todoDtos);
        return todoList;
    }

    @Override
    public void createTodoList(TodosRequestDto requestDto) {
        final ProjectModel todosModel = new ProjectModel();
        todosModel.setCode(UUID.randomUUID().toString());
        todosModel.setName(requestDto.getName());
        todosModel.setOwner(requestDto.getOwner());
        projectService.createTodoList(todosModel);
        achievementStrategy.createAchievement(todosModel);
    }

    @Override
    public Boolean updateTodoList(TodosRequestDto requestDto) {
        ProjectModel existed = projectService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        existed.setName(requestDto.getName());
        projectService.updateTodoList(existed);
        achievementStrategy.updateAchievement(existed);
        return true;
    }

    @Override
    public Boolean deleteTodoList(TodosRequestDto requestDto) {
        ProjectModel existed = projectService.getTodosByCode(requestDto.getCode());
        if (Objects.isNull(existed)){
            return false;
        }
        projectService.deleteTodoList(existed);
        achievementStrategy.deleteAchievement(requestDto.getCode());
        return true;
    }
}
