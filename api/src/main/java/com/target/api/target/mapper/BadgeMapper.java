package com.target.api.target.mapper;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.model.BadgeModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("badgeMapper")
public class BadgeMapper {

    public BadgeDto toBadgeDto(BadgeModel source){
        BadgeDto target = new BadgeDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setScore(String.valueOf(source.getScore()));
        target.setMediaUrl(source.getMediaUrl());
        return target;
    }

    public List<BadgeDto> toBadgeDtoList(List<BadgeModel> source){
        List<BadgeDto> target = new ArrayList<>();
        for (BadgeModel badge : source){
            target.add(this.toBadgeDto(badge));
        }
        return target;
    }
}
