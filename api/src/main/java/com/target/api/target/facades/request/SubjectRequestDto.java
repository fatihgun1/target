package com.target.api.target.facades.request;

import lombok.Data;

@Data
public class SubjectRequestDto {
    private String code;
    private String description;
    private String youtubeVideoId;
    private String education;
    private String completed;
}
