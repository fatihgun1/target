package com.target.api.target.mapper;

import com.target.api.target.dto.StatusDto;
import com.target.api.target.model.StatusModel;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("statusMapper")
public class StatusMapper {

    public StatusDto toMapStatusDto(StatusModel source){
        StatusDto target = new StatusDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setScore(source.getScore());
        target.setContainer(source.getContainer().getCode());
        return target;
    }

    public List<StatusDto> toMapStatusList(List<StatusModel> source){
        if (CollectionUtils.isEmpty(source)){
            return Collections.emptyList();
        }
        List<StatusDto> target = new ArrayList<>();
        for (StatusModel status : source){
            target.add(this.toMapStatusDto(status));
        }
        return target;
    }

}
