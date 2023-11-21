package com.target.api.target.facades.todos.impl;

import com.target.api.target.dto.StatusDto;
import com.target.api.target.facades.request.StatusRequestDto;
import com.target.api.target.facades.todos.StatusFacades;
import com.target.api.target.mapper.StatusMapper;
import com.target.api.target.model.StatusModel;
import com.target.api.target.model.TodosModel;
import com.target.api.target.services.StatusService;
import com.target.api.target.services.TodosService;
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
    @Resource(name = "todosService")
    private TodosService todosService;

    @Override
    public StatusDto getStatusByCode(String code) {
        return statusMapper.toMapStatusDto(statusService.getStatusByCode(code));
    }

    @Override
    public Boolean createStatus(StatusRequestDto statusRequestDto) {
        TodosModel todos = todosService.getTodosByCode(statusRequestDto.getTodoscode());
        if (Objects.isNull(todos)){
            return false;
        }
        StatusModel status = new StatusModel();
        status.setName(statusRequestDto.getName());
        status.setCode(UUID.randomUUID().toString());
        status.setScore(statusRequestDto.getScore());
        status.setTodos(todos);
        statusService.createStatus(status);
        return true;
    }

    @Override
    public Boolean updateStatus(StatusRequestDto statusRequestDto) {
        StatusModel status = statusService.getStatusByCode(statusRequestDto.getCode());
        if(Objects.isNull(status)){
            return false;
        }
        status.setScore(statusRequestDto.getScore());
        status.setName(statusRequestDto.getName());
        statusService.updateStatus(status);
        return true;
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
