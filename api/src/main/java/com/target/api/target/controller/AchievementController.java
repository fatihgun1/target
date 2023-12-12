package com.target.api.target.controller;

import com.target.api.target.dto.AchievementDto;
import com.target.api.target.facades.achievement.AchievementFacades;
import com.target.api.target.facades.request.AchievementRequestDto;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/achievement",method = RequestMethod.GET)
public class AchievementController {
    @Resource(name = "achievementFacades")
    private AchievementFacades achievementFacades;

    @GetMapping("/all/{owner}")
    public List<AchievementDto> getAchievementByOwner(@PathVariable String owner){
        return achievementFacades.getAchievementByOwner(owner);
    }

}
