package com.target.api.target.mapper;

import com.target.api.target.dto.BadgeEntryDto;
import com.target.api.target.model.BadgeEntryModel;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("badgeEntryMapper")
public class BadgeEntryMapper {

        public BadgeEntryDto toMapBadgeEntryDto(BadgeEntryModel source){
            BadgeEntryDto target = new BadgeEntryDto();
            target.setCode(source.getCode());
            target.setDescription(source.getDescription());
            target.setName(source.getName());
            target.setOwner(source.getOwner());
            target.setScore(source.getScore());
            target.setMediaUrl(source.getMediaUrl());
            return target;
        }

        public List<BadgeEntryDto> toMapBadgeEntryList(List<BadgeEntryModel> source){
            if (CollectionUtils.isEmpty(source)){
                return Collections.emptyList();
            }
            List<BadgeEntryDto> target = new ArrayList<>();
            for (BadgeEntryModel badgeEntry : source){
                target.add(this.toMapBadgeEntryDto(badgeEntry));
            }
            return target;
        }

}
