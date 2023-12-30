package com.target.api.target.facades.education;

import com.target.api.target.dto.SubjectDto;
import com.target.api.target.facades.request.SubjectRequestDto;

import java.util.List;

public interface SubjectFacade {
    List<SubjectDto> getSubjectOfEducation(SubjectRequestDto subject);
    SubjectDto createSubject(SubjectRequestDto subject);
    SubjectDto updateSubject(SubjectRequestDto subject);
    Boolean deleteSubject(SubjectRequestDto subject);
}
