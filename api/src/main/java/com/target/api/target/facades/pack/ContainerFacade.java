package com.target.api.target.facades.pack;


import com.target.api.target.dto.ContainerDto;
import com.target.api.target.facades.request.ContainerRequestDto;

public interface ContainerFacade {
    ContainerDto createContainer(ContainerRequestDto container);
    ContainerDto getContainer(String code);
    ContainerDto updateContainer(ContainerRequestDto container);
    void deleteContainer(ContainerRequestDto container);
}
