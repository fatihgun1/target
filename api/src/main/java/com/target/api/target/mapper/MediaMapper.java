package com.target.api.target.mapper;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.dto.MediaDto;
import com.target.api.target.model.BadgeModel;
import com.target.api.target.model.MediaModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("mediaMapper")
public class MediaMapper {

    public MediaDto toBadgeDto(MediaModel source){
        MediaDto target = new MediaDto();
        target.setUrl(source.getUrl());
        return target;
    }

}
