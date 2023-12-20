package com.target.api.target.controller;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.facades.achievement.BadgeFacades;
import com.target.api.target.facades.request.BadgeRequestDto;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/authenticated/badge",method = RequestMethod.GET)
public class BadgeController {

    @Resource(name = "badgeFacades")
    private BadgeFacades badgeFacades;
    @GetMapping(name = "{code}")
    public BadgeDto getBadgeByCode(@PathVariable String code){
        return badgeFacades.getBadgeByCode(code);
    }

    @GetMapping("/all/{owner}")
    public List<BadgeDto> getBadges(@PathVariable String owner){
        return badgeFacades.getBadgeByOwner(owner);
    }

    @PostMapping("/create")
    public BadgeDto createBadge(@Valid @RequestBody BadgeRequestDto statusRequestDto){
        return badgeFacades.crateBadge(statusRequestDto);
    }

    @PostMapping("/update")
    public BadgeDto updateBadge(@Valid @RequestBody BadgeRequestDto statusRequestDto){
        return badgeFacades.updateBadge(statusRequestDto);
    }

    @PostMapping("/delete")
    public Boolean deleteBadge(@RequestBody BadgeRequestDto statusRequestDto){
        return badgeFacades.deleteBadge(statusRequestDto);
    }
}
