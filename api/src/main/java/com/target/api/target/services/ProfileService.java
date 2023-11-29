package com.target.api.target.services;

import com.target.api.target.model.ProfileModel;

public interface ProfileService {
    ProfileModel createProfile(ProfileModel profile);
    ProfileModel updateProfile(ProfileModel profile);
    ProfileModel getProfile(String owner);
}
