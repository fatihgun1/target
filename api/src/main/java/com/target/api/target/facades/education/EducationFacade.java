package com.target.api.target.facades.education;

import com.target.api.target.dto.EducationDto;
import com.target.api.target.facades.request.EducationRequestDto;

import java.util.List;

public interface EducationFacade {
    List<EducationDto> userEducations();
    EducationDto createEducation(EducationRequestDto education);
    EducationDto updateEducation(EducationRequestDto education);
    Boolean deleteEducation(EducationRequestDto education);
}
