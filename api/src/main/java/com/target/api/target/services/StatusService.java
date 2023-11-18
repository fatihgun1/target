package com.target.api.target.services;

import com.target.api.target.model.StatusModel;

public interface StatusService {
    StatusModel getStatusByCode(String code);
    void createStatus(StatusModel statusModel);
    void updateStatus(StatusModel statusModel);
    void deleteStatus(StatusModel statusModel);
}
