package com.target.api.target.mapper;

import com.target.api.target.dto.ProjectDto;
import com.target.api.target.model.ProjectModel;
import org.springframework.stereotype.Service;

@Service("projectMapper")
public class ProjectMapper {

    public ProjectDto toTodosDto(ProjectModel source){
        ProjectDto target = new ProjectDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setOwner(source.getOwner());
        return target;
    }
}
