package com.target.api.target.services.impl;

import com.target.api.target.mapper.ContainerMapper;
import com.target.api.target.model.ContainerModel;
import com.target.api.target.repository.ContainerRepository;
import com.target.api.target.services.ContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("containerService")
public class ContainerServiceImpl implements ContainerService {

    @Autowired
    private ContainerRepository containerRepository;

    @Override
    public ContainerModel createContainer(ContainerModel container) {
        return containerRepository.save(container);
    }

    @Override
    public ContainerModel getContainer(String code) {
        return containerRepository.findByCode(code);
    }

    @Override
    public ContainerModel updateContainer(ContainerModel container) {
        return containerRepository.save(container);
    }

    @Override
    public void deleteContainer(ContainerModel container) {
        containerRepository.delete(container);
    }
}
