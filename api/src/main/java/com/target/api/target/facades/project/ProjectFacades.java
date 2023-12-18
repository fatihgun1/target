package com.target.api.target.facades.project;

import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.ProjectRequestDto;

import java.util.List;

public interface ProjectFacades {
    List<ProjectDto> getProjectByOwner(String owner);
    ProjectDto getProjectByCode(String code);
    ProjectDto createProject(ProjectRequestDto requestDto);
    ProjectDto updateProject(ProjectRequestDto requestDto);
    Boolean deleteProject(ProjectRequestDto requestDto);
}
