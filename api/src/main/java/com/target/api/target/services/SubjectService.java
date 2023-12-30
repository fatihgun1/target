package com.target.api.target.services;

import com.target.api.target.model.SubjectModel;

import java.util.List;

public interface SubjectService {
    List<SubjectModel> getSubjectOfEducation(String education);
    SubjectModel getSubject(String code);
    SubjectModel crateSubject(SubjectModel subject);
    SubjectModel updateSubject(SubjectModel subject);
    void deleteSubject(SubjectModel subject);
}
