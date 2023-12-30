package com.target.api.target.facades.education.impl;

import com.target.api.target.dto.EducationDto;
import com.target.api.target.facades.education.EducationFacade;
import com.target.api.target.facades.request.EducationRequestDto;
import com.target.api.target.mapper.EducationMapper;
import com.target.api.target.model.EducationModel;
import com.target.api.target.services.EducationService;
import com.target.api.target.util.CurrentUser;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service("educationFacade")
public class EducationFacadeImpl implements EducationFacade {
    @Resource(name = "educationService")
    private EducationService educationService;
    @Resource(name = "educationMapper")
    private EducationMapper educationMapper;

    @Override
    public List<EducationDto> userEducations() {
        return educationMapper.
                toMapEducationModelListToEducationDtoList(
                        educationService.userEducations(CurrentUser.resolve())
                );
    }

    @Override
    public EducationDto createEducation(EducationRequestDto education) {
        EducationModel ne = new EducationModel();
        ne.setCode(UUID.randomUUID().toString());
        ne.setName(education.getName());
        ne.setOwner(CurrentUser.resolve());
        return educationMapper.toMapEducationModelToEducationDto(educationService.createEducation(ne));
    }

    @Override
    public EducationDto updateEducation(EducationRequestDto education) {
        EducationModel exited = educationService.getEducation(education.getCode());
        if (Objects.isNull(exited)){
            throw new RuntimeException("Cannot update education");
        }

        exited.setName(education.getName());
        return educationMapper.toMapEducationModelToEducationDto(educationService.updateEducation(exited));
    }

    @Override
    public Boolean deleteEducation(EducationRequestDto education) {
        EducationModel exited = educationService.getEducation(education.getCode());
        if (Objects.isNull(exited)){
            throw new RuntimeException("cannot delete education");
        }
        educationService.deleteEducation(exited);
        return Boolean.TRUE;
    }
}
