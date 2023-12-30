package com.target.api.target.services.impl;

import com.target.api.target.model.EducationModel;
import com.target.api.target.repository.EducationRepository;
import com.target.api.target.services.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("educationService")
public class EducationServiceImpl implements EducationService {

    @Autowired
    private EducationRepository repository;

    @Override
    public List<EducationModel> userEducations(String owner) {
        return repository.findByOwner(owner);
    }

    @Override
    public EducationModel getEducation(String code) {
        return repository.findByCode(code);
    }

    @Override
    public EducationModel createEducation(EducationModel education) {
        return repository.save(education);
    }

    @Override
    public EducationModel updateEducation(EducationModel education) {
        return repository.save(education);
    }

    @Override
    public void deleteEducation(EducationModel education) {
        try {
            repository.delete(education);
        }catch (Exception e){
            throw new RuntimeException("Cannot delete education");
        }
    }
}
