package com.target.api.target.controller;

import com.target.api.target.dto.EducationDto;
import com.target.api.target.facades.education.EducationFacade;
import com.target.api.target.facades.request.EducationRequestDto;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/authenticated/education",method = RequestMethod.GET)
public class EducationController {
    @Resource(name = "educationFacade")
    private EducationFacade educationFacade;


    @GetMapping("/all")
    public List<EducationDto> userEducations(){
        return educationFacade.userEducations();
    }
    @PostMapping("/create")
    public EducationDto createEducation(@RequestBody EducationRequestDto education){
        return educationFacade.createEducation(education);
    }
    @PostMapping("/update")
    public EducationDto updateEducation(@RequestBody EducationRequestDto education){
        return educationFacade.updateEducation(education);
    }
    @PostMapping("/delete")
    public Boolean deleteEducation(@RequestBody EducationRequestDto education){
        return educationFacade.deleteEducation(education);
    }
}
