package com.target.api.target.services.impl;

import com.target.api.target.model.ProfileModel;
import com.target.api.target.repository.ProfileRepository;
import com.target.api.target.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    @Override
    public ProfileModel createProfile(ProfileModel profile) {
        return profileRepository.save(profile);
    }

    @Override
    public ProfileModel updateProfile(ProfileModel profile) {
        return profileRepository.save(profile);
    }

    @Override
    public ProfileModel getProfile(String owner) {
        return profileRepository.findByOwner(owner);
    }
}
