package com.target.api.target.mapper;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.target.api.target.dto.ProjectDto;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.util.CurrentUser;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service("projectMapper")
public class ProjectMapper {
    @Resource(name = "todoMapper")
    private TodoMapper todoMapper;
    @Resource(name = "containerMapper")
    private ContainerMapper containerMapper;

    public ProjectDto toMapProjectDto(ProjectModel source){
        if (Objects.isNull(source)){
            return new ProjectDto();
        }
        ProjectDto target = new ProjectDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setOwner(CurrentUser.resolve());
        target.setTodos(todoMapper.toMapTodoDtoList(source.getTodos()));
        target.setContainer(containerMapper.toMapContainerDto(source.getContainer()));
        return target;
    }

    public List<ProjectDto> toMapProjectList(List<ProjectModel> source){
        if (CollectionUtils.isEmpty(source)){
            return Collections.emptyList();
        }
        List<ProjectDto> target = new ArrayList<>();
        for (ProjectModel project : source){
            target.add(this.toMapProjectDto(project));
        }
        return target;
    }

}
