package com.target.api.target.mapper;

import com.target.api.target.dto.ProfileDto;
import com.target.api.target.facades.request.ProfileRequestDto;
import com.target.api.target.model.ProfileModel;
import org.springframework.stereotype.Service;

@Service("profileMapper")
public class ProfileMapper {

    public ProfileDto toProfileDto(ProfileModel source){
        ProfileDto target = new ProfileDto();
        target.setTitle(source.getTitle());
        target.setFullName(source.getFullName());
        target.setBio(source.getBio());
        target.setMediaUrl(source.getMediaUrl());
        target.setProfileScore(source.getProfileScore());
        return target;
    }

    public void update(ProfileModel target, ProfileRequestDto source){
        target.setTitle(source.getTitle());
        target.setFullName(source.getFullName());
        target.setBio(source.getBio());
        target.setMediaUrl(source.getMediaUrl());
    }
}
