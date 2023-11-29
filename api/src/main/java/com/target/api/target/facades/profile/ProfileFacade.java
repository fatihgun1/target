package com.target.api.target.facades.profile;

import com.target.api.target.dto.ProfileDto;
import com.target.api.target.facades.request.ProfileRequestDto;


public interface ProfileFacade {
    ProfileDto updateProfile(ProfileRequestDto profile);
    ProfileDto getProfile(String owner);
}
