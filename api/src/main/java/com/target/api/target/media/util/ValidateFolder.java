package com.target.api.target.media.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Objects;

@Service("validateFolder")
public class ValidateFolder {

    @Value("${allowed.media.folders}")
    private String folders;
    public Boolean validate(String folder){
        return Objects.nonNull(folder) && Arrays.stream(folders.split(",")).toList().contains(folder);
    }
}
