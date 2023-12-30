package com.target.api.target.services;

import com.target.api.target.model.EducationModel;

import java.util.List;

public interface EducationService {
    List<EducationModel> userEducations(String owner);
    EducationModel getEducation(String code);
    EducationModel createEducation(EducationModel education);
    EducationModel updateEducation(EducationModel education);
    void  deleteEducation(EducationModel education);
}
