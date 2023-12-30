package com.target.api.target.facades.education.impl;

import com.target.api.target.dto.SubjectDto;
import com.target.api.target.facades.education.SubjectFacade;
import com.target.api.target.facades.request.SubjectRequestDto;
import com.target.api.target.mapper.SubjectMapper;
import com.target.api.target.model.SubjectModel;
import com.target.api.target.services.SubjectService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service("subjectFacade")
public class SubjectFacadeImpl implements SubjectFacade {
    @Resource(name = "subjectService")
    private SubjectService subjectService;
    @Resource(name = "subjectMapper")
    private SubjectMapper subjectMapper;


    @Override
    public List<SubjectDto> getSubjectOfEducation(SubjectRequestDto subject) {
        return subjectMapper.toMapSubjectModelListToSubjectDtoList(subjectService.getSubjectOfEducation(subject.getEducation()));
    }

    @Override
    public SubjectDto createSubject(SubjectRequestDto subject) {
        SubjectModel subjectModel = new SubjectModel();
        subjectModel.setCode(UUID.randomUUID().toString());
        subjectModel.setDescription(subject.getDescription());
        subjectModel.setYoutubeVideoId(subject.getYoutubeVideoId());
        subjectModel.setEducation(subject.getEducation());
        return subjectMapper.toMapSubjectModelToSubjectDto(subjectService.crateSubject(subjectModel));
    }

    @Override
    public SubjectDto updateSubject(SubjectRequestDto subject) {
        SubjectModel existed = subjectService.getSubject(subject.getCode());
        if (Objects.isNull(existed)){
            throw new RuntimeException("Cannot find subject");
        }
        if (subject.getYoutubeVideoId() != null){
            existed.setYoutubeVideoId(subject.getYoutubeVideoId());
        }
        if (subject.getDescription() != null){
            existed.setDescription(subject.getDescription());
        }
        if (subject.getCompleted() != null){
            existed.setCompleted(subject.getCompleted());
        }
        return subjectMapper.toMapSubjectModelToSubjectDto(subjectService.updateSubject(existed));
    }

    @Override
    public Boolean deleteSubject(SubjectRequestDto subject) {
        SubjectModel existed = subjectService.getSubject(subject.getCode());
        if (Objects.isNull(existed)){
            throw new RuntimeException("Cannot delete subject");
        }
        subjectService.deleteSubject(existed);
        return Boolean.TRUE;
    }
}
