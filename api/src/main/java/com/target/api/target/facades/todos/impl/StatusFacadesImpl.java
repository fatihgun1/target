package com.target.api.target.facades.todos.impl;

import com.target.api.target.dto.StatusDto;
import com.target.api.target.facades.request.StatusRequestDto;
import com.target.api.target.facades.todos.StatusFacades;
import com.target.api.target.mapper.StatusMapper;
import com.target.api.target.model.ContainerModel;
import com.target.api.target.model.StatusModel;
import com.target.api.target.model.ProjectModel;
import com.target.api.target.services.ContainerService;
import com.target.api.target.services.StatusService;
import com.target.api.target.services.ProjectService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service("statusFacades")
public class StatusFacadesImpl implements StatusFacades {
    @Resource(name = "statusService")
    private StatusService statusService;
    @Resource(name = "statusMapper")
    private StatusMapper statusMapper;
    @Resource(name = "containerService")
    private ContainerService containerService;

    @Override
    public StatusDto getStatusByCode(String code) {
        return statusMapper.toMapStatusDto(statusService.getStatusByCode(code));
    }

    @Override
    public StatusDto createStatus(StatusRequestDto statusRequestDto) {
        ContainerModel container = containerService.getContainer(statusRequestDto.getContainer());
        if (Objects.isNull(container)){
            return null;
        }
        StatusModel status = new StatusModel();
        status.setName(statusRequestDto.getName());
        status.setCode(UUID.randomUUID().toString());
        status.setScore(statusRequestDto.getScore());
        status.setContainer(container);
        return statusMapper.toMapStatusDto(statusService.createStatus(status));
    }

    @Override
    public StatusDto updateStatus(StatusRequestDto statusRequestDto) {
        StatusModel status = statusService.getStatusByCode(statusRequestDto.getCode());
        if(Objects.isNull(status)){
            return null;
        }
        status.setScore(statusRequestDto.getScore());
        status.setName(statusRequestDto.getName());
        return statusMapper.toMapStatusDto(statusService.updateStatus(status));
    }

    @Override
    public Boolean deleteStatus(StatusRequestDto statusRequestDto) {
        StatusModel status = statusService.getStatusByCode(statusRequestDto.getCode());
        if(Objects.isNull(status)){
            return false;
        }
        statusService.deleteStatus(status);
        return true;
    }
}
