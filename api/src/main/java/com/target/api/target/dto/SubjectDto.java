package com.target.api.target.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.target.api.target.config.VIEW;
import lombok.Data;

@Data
public class SubjectDto {
    private String code;
    private String description;
    private String youtubeVideoId;
    private String education;
    private String completed;
}
