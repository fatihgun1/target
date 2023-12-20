package com.target.api.target.util;

import com.target.api.target.model.UserModel;
import org.springframework.security.core.context.SecurityContextHolder;

public class CurrentUser {

    public static String resolve(){
        return ((UserModel)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail();
    }
}
