package com.target.api.target.facades.profile.impl;

import com.target.api.target.dto.ProfileDto;
import com.target.api.target.facades.profile.ProfileFacade;
import com.target.api.target.facades.request.ProfileRequestDto;
import com.target.api.target.mapper.ProfileMapper;
import com.target.api.target.model.ProfileModel;
import com.target.api.target.services.ProfileService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service("profileFacade")
public class ProfileFacadeImpl implements ProfileFacade {
    @Resource(name = "profileService")
    private ProfileService profileService;
    @Resource(name = "profileMapper")
    private ProfileMapper profileMapper;

    @Override
    public ProfileDto updateProfile(ProfileRequestDto profile) {
        ProfileModel exitedProfile = profileService.getProfile(profile.getOwner());
        if (Objects.isNull(exitedProfile)){
            throw  new RuntimeException("User cannot find");
        }
        profileMapper.update(exitedProfile,profile);
        return profileMapper.toProfileDto(profileService.updateProfile(exitedProfile));
    }

    @Override
    public ProfileDto getProfile(String owner) {
        ProfileModel profile = profileService.getProfile(owner);
        if (Objects.isNull(profile)){
            throw  new RuntimeException("User cannot find");
        }
        return profileMapper.toProfileDto(profile);
    }
}
