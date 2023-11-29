package com.target.api.target.services.impl;


import com.target.api.target.dto.JwtAuthenticationResponse;
import com.target.api.target.dto.RefreshTokenRequest;
import com.target.api.target.dto.SignInRequest;
import com.target.api.target.dto.SignupRequest;
import com.target.api.target.model.ProfileModel;
import com.target.api.target.model.RoleEnum;
import com.target.api.target.model.UserModel;
import com.target.api.target.repository.UserRepository;
import com.target.api.target.services.AuthenticationService;
import com.target.api.target.services.JwtService;
import com.target.api.target.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final ProfileService profileService;
    @Override
    public UserModel signUp(SignupRequest signupRequest){
        UserModel user = new UserModel();
        user.setEmail(signupRequest.getEmail());
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setRoles(RoleEnum.USER);
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        userRepository.save(user);
        this.createProfile(signupRequest);
        return user;
    }


    @Override
    public JwtAuthenticationResponse signIn(SignInRequest signInRequest) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),signInRequest.getPassword()));
        var user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt =jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);
        JwtAuthenticationResponse response = new JwtAuthenticationResponse();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken);

        return response;
    }

    @Override
    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        UserModel user = userRepository.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(),user)){
            var jwt = jwtService.generateToken(user);
            JwtAuthenticationResponse response = new JwtAuthenticationResponse();
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            return response;
        }
        return null;
    }

    protected void createProfile(SignupRequest signupRequest){
        ProfileModel profileModel = new ProfileModel();
        profileModel.setFullName(signupRequest.getFirstName() + " " + signupRequest.getLastName());
        profileModel.setOwner(signupRequest.getEmail());
        profileService.createProfile(profileModel);
    }
}