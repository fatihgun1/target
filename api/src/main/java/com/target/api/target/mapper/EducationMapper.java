package com.target.api.target.mapper;

import com.target.api.target.dto.EducationDto;
import com.target.api.target.model.EducationModel;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("educationMapper")
public class EducationMapper {
    public EducationDto toMapEducationModelToEducationDto(EducationModel source){
        EducationDto target = new EducationDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        return target;
    }

    public List<EducationDto> toMapEducationModelListToEducationDtoList(List<EducationModel> source){
        if (CollectionUtils.isEmpty(source)){
            return Collections.emptyList();
        }

        List<EducationDto> target = new ArrayList<>();
        for (EducationModel education: source){
            target.add(this.toMapEducationModelToEducationDto(education));
        }

        return target;
    }
}
