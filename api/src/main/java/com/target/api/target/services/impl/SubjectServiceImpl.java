package com.target.api.target.services.impl;

import com.target.api.target.model.SubjectModel;
import com.target.api.target.repository.SubjectRepository;
import com.target.api.target.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("subjectService")
public class SubjectServiceImpl implements SubjectService {
    @Autowired
    private SubjectRepository repository;

    @Override
    public List<SubjectModel> getSubjectOfEducation(String education) {
        return repository.findByEducation(education);
    }

    @Override
    public SubjectModel getSubject(String code) {
        return repository.findByCode(code);
    }

    @Override
    public SubjectModel crateSubject(SubjectModel subject) {
        return repository.save(subject);
    }

    @Override
    public SubjectModel updateSubject(SubjectModel subject) {
        return repository.save(subject);
    }

    @Override
    public void deleteSubject(SubjectModel subject) {
        try{
            repository.delete(subject);
        }catch (Exception e){
            throw new RuntimeException("Cannot delete subject");
        }
    }
}
