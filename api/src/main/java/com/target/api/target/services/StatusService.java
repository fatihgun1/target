package com.target.api.target.services;

import com.target.api.target.model.StatusModel;

public interface StatusService {
    StatusModel getStatusByCode(String code);
    StatusModel createStatus(StatusModel statusModel);
    StatusModel updateStatus(StatusModel statusModel);
    void deleteStatus(StatusModel statusModel);
}
