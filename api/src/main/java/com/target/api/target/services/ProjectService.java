package com.target.api.target.services;

import com.target.api.target.model.BadgeModel;
import com.target.api.target.model.ProjectModel;

import java.util.List;

public interface ProjectService {
    List<ProjectModel> getTodosByOwner(String owner);
    ProjectModel getTodosByCode(String name);
    void createTodoList(ProjectModel todosDto);
    void updateProject(ProjectModel todosDto);
    void deleteTodoList(ProjectModel todosDto);
    List<BadgeModel> getBadgesByProject(String code);
}
