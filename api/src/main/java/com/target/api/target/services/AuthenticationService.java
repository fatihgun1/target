package com.target.api.target.services;

import com.target.api.target.dto.JwtAuthenticationResponse;
import com.target.api.target.dto.RefreshTokenRequest;
import com.target.api.target.dto.SignInRequest;
import com.target.api.target.dto.SignupRequest;
import com.target.api.target.model.UserModel;

public interface AuthenticationService {
    UserModel signUp(SignupRequest signupRequest);
    JwtAuthenticationResponse signIn(SignInRequest signupRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}