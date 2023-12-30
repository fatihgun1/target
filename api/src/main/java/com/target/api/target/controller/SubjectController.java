package com.target.api.target.controller;

import com.target.api.target.dto.SubjectDto;
import com.target.api.target.facades.education.SubjectFacade;
import com.target.api.target.facades.request.SubjectRequestDto;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/authenticated/subject",method = RequestMethod.GET)
public class SubjectController {
    @Resource(name = "subjectFacade")
    private SubjectFacade subjectFacade;

    @PostMapping("/all")
    public List<SubjectDto> getSubjectOfEducation(@RequestBody SubjectRequestDto subject){
        return subjectFacade.getSubjectOfEducation(subject);
    }
    @PostMapping("/create")
    public SubjectDto createSubject(@RequestBody SubjectRequestDto subject){
        return subjectFacade.createSubject(subject);
    }
    @PostMapping("/update")
    public SubjectDto updateEducation(@RequestBody SubjectRequestDto subject){
        return subjectFacade.updateSubject(subject);
    }
    @PostMapping("/delete")
    public Boolean deleteEducation(@RequestBody SubjectRequestDto subject){
        return subjectFacade.deleteSubject(subject);
    }
}
