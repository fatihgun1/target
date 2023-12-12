package com.target.api.target.facades.pack.impl;

import com.target.api.target.dto.ContainerDto;
import com.target.api.target.facades.pack.ContainerFacade;
import com.target.api.target.facades.request.ContainerReplaceDto;
import com.target.api.target.facades.request.ContainerRequestDto;
import com.target.api.target.mapper.ContainerMapper;
import com.target.api.target.model.ContainerModel;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.services.ContainerService;
import com.target.api.target.services.PackService;
import com.target.api.target.services.ProjectService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;
@Service("containerFacade")
public class ContainerFacadeImpl implements ContainerFacade {
    @Resource(name = "containerService")
    private ContainerService containerService;
    @Resource(name = "packService")
    private PackService packService;
    @Resource(name = "containerMapper")
    private ContainerMapper containerMapper;
    @Resource(name = "projectService")
    private ProjectService projectService;

    @Override
    public ContainerDto createContainer(ContainerRequestDto container) {
        ContainerModel newContainer = new ContainerModel();
        newContainer.setName(container.getName());
        newContainer.setCode(UUID.randomUUID().toString());
        newContainer.setPack(packService.getPackByOwner(container.getOwner()));
        return containerMapper.toMapContainerDto(containerService.createContainer(newContainer));
    }

    @Override
    public ContainerDto getContainer(String code) {
        return containerMapper.toMapContainerDto(containerService.getContainer(code));
    }

    @Override
    public ContainerDto updateContainer(ContainerRequestDto container) {
        ContainerModel updateContainer = containerService.getContainer(container.getCode());
        if (Objects.nonNull(updateContainer)){
            updateContainer.setName(container.getName());
        }
        return containerMapper.toMapContainerDto(containerService.updateContainer(updateContainer));
    }

    @Override
    public Boolean updateProjectContainer(ContainerReplaceDto request) {
        ContainerModel container = containerService.getContainer(request.getContainerCode());
        ProjectModel project = projectService.getTodosByCode(request.getProjectCode());
        if (Objects.nonNull(container) && Objects.nonNull(project)){
            project.setContainer(container);
            projectService.updateProject(project);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    @Override
    public void deleteContainer(ContainerRequestDto container) {
        ContainerModel deleteContainer = containerService.getContainer(container.getCode());
        if (Objects.nonNull(deleteContainer)){
            containerService.deleteContainer(deleteContainer);
        }
    }
}
