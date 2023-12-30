package com.target.api.target.mapper;

import com.target.api.target.dto.SubjectDto;
import com.target.api.target.model.SubjectModel;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("subjectMapper")
public class SubjectMapper {

    public SubjectDto toMapSubjectModelToSubjectDto(SubjectModel source){
        SubjectDto target = new SubjectDto();
        target.setCode(source.getCode());
        target.setDescription(source.getDescription());
        target.setEducation(source.getEducation());
        target.setYoutubeVideoId(source.getYoutubeVideoId());
        target.setCompleted(source.getCompleted());
        return target;
    }

    public List<SubjectDto> toMapSubjectModelListToSubjectDtoList(List<SubjectModel> source){
        if (CollectionUtils.isEmpty(source)){
            return Collections.emptyList();
        }
        List<SubjectDto> target = new ArrayList<>();
        for (SubjectModel subject : source){
            target.add(this.toMapSubjectModelToSubjectDto(subject));
        }
        return target;
    }

}
