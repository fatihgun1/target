package com.target.api.target.services;

import com.target.api.target.model.ContainerModel;

public interface ContainerService {

    ContainerModel createContainer(ContainerModel container);
    ContainerModel getContainer(String code);
    ContainerModel getUnpublishedContainer(String code);
    ContainerModel updateContainer(ContainerModel container);
    void deleteContainer(ContainerModel container);
}
