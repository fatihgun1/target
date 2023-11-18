package com.target.api.target.services.impl;

import com.target.api.target.model.StatusModel;
import com.target.api.target.repository.StatusRepository;
import com.target.api.target.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("statusService")
public class StatusServiceImpl implements StatusService {
    @Autowired
    private StatusRepository statusRepository;
    @Override
    public StatusModel getStatusByCode(String code) {
        return statusRepository.findByCode(code);
    }

    @Override
    public void createStatus(StatusModel statusModel) {
        statusRepository.save(statusModel);
    }

    @Override
    public void updateStatus(StatusModel statusModel) {
        statusRepository.save(statusModel);
    }

    @Override
    public void deleteStatus(StatusModel statusModel) {
        statusRepository.delete(statusModel);
    }
}
