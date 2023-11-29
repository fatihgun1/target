package com.target.api.target.repository;

import com.target.api.target.model.ProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileModel,Long> {
    ProfileModel findByOwner(String code);
}
