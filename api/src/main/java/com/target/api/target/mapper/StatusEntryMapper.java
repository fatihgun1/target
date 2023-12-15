package com.target.api.target.mapper;

import com.target.api.target.dto.StatusEntryDto;
import com.target.api.target.model.StatusEntryModel;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("statusEntryMapper")
public class StatusEntryMapper {

    public StatusEntryDto toMapStatusEntryMapper(StatusEntryModel source){
        StatusEntryDto target = new StatusEntryDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setScore(source.getScore());
        return target;
    }

    public List<StatusEntryDto> toMapStatusEntryList(List<StatusEntryModel> source){
        if (CollectionUtils.isEmpty(source)){
            return Collections.emptyList();
        }
        List<StatusEntryDto> target = new ArrayList<>();
        for (StatusEntryModel statusEntry : source){
            target.add(this.toMapStatusEntryMapper(statusEntry));
        }

        return target;
    }

}
