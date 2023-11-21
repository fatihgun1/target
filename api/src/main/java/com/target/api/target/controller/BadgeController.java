package com.target.api.target.controller;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.facades.achievement.BadgeFacades;
import com.target.api.target.facades.request.BadgeRequestDto;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/badge",method = RequestMethod.GET)
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
    public ResponseEntity<String> createBadge(@RequestBody BadgeRequestDto statusRequestDto){
        badgeFacades.crateBadge(statusRequestDto);
        return ResponseEntity.ok("Created");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateBadge(@RequestBody BadgeRequestDto statusRequestDto){
        Boolean succeed = badgeFacades.updateBadge(statusRequestDto);
        return succeed ? ResponseEntity.ok("Updated") : ResponseEntity.ok("Could not update");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteBadge(@RequestBody BadgeRequestDto statusRequestDto){
        Boolean succeed = badgeFacades.deleteBadge(statusRequestDto);
        return succeed ? ResponseEntity.ok("Updated") : ResponseEntity.ok("Could not update");
    }
}
