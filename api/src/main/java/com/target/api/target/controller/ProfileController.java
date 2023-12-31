package com.target.api.target.controller;

import com.target.api.target.dto.ProfileDto;
import com.target.api.target.facades.profile.ProfileFacade;
import com.target.api.target.facades.request.ProfileRequestDto;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/authenticated/profile",method = RequestMethod.GET)
public class ProfileController {

    @Resource(name = "profileFacade")
    private ProfileFacade profileFacade;

    @GetMapping
    public ProfileDto profile(){
        return profileFacade.getProfile();
    }

    @PostMapping("/update")
    public ProfileDto updateProfile(@Valid @RequestBody ProfileRequestDto profileRequestDto){
        return profileFacade.updateProfile(profileRequestDto);
    }
}
