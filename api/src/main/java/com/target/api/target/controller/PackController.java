package com.target.api.target.controller;

import com.target.api.target.dto.PackDto;
import com.target.api.target.facades.pack.PackFacade;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/authenticated/pack",method = RequestMethod.GET)
public class PackController {
    @Resource(name = "packFacade")
    private PackFacade packFacade;
    @GetMapping
    public PackDto pack(){
        return packFacade.getUserPack();
    }
}
