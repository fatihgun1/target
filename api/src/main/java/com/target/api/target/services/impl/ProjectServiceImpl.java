package com.target.api.target.services.impl;

import com.target.api.target.model.BadgeModel;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.repository.BadgeRepository;
import com.target.api.target.repository.ProjectRepository;
import com.target.api.target.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("projectService")
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository todosRepository;
    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public List<ProjectModel> getTodosByOwner(String owner) {
        return todosRepository.findByOwner(owner);
    }

    @Override
    public ProjectModel getTodosByCode(String name) {
        return todosRepository.findByCode(name);
    }

    @Override
    public void createTodoList(ProjectModel todosModel) {
        todosRepository.save(todosModel);
    }

    @Override
    public void updateProject(ProjectModel todosModel) {
         todosRepository.save(todosModel);
    }

    @Override
    public void deleteTodoList(ProjectModel todosModel) {
         todosRepository.delete(todosModel);
    }

    @Override
    public List<BadgeModel> getBadgesByProject(String code) {
        return badgeRepository.findBadgeByCode(code);
    }
}
