package com.target.api.target.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.target.api.target.config.VIEW;
import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.ProjectRequestDto;
import com.target.api.target.facades.project.ProjectFacades;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/project",method = RequestMethod.GET)
public class ProjectController {

    @Resource(name = "projectFacades")
    private ProjectFacades projectFacades;

    @PostMapping("/create")
    public ResponseEntity<String> createTodos(@Valid @RequestBody ProjectRequestDto todosRequestDto){
        projectFacades.createProject(todosRequestDto);
        return ResponseEntity.ok("Created");
    }

    @GetMapping("/all/{owner}")
    @JsonView(VIEW.BASE.class)
    public List<ProjectDto> getProject(@PathVariable String owner){
        return projectFacades.getProjectByOwner(owner);
    }

    @GetMapping("/get/{code}")
    public ProjectDto getTodosByCode(@PathVariable("code") String code){
        return projectFacades.getProjectByCode(code);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTodos(@Valid @RequestBody ProjectRequestDto todosRequestDto){
        Boolean succeed = projectFacades.updateProject(todosRequestDto);
        return succeed ? ResponseEntity.ok("Updated"): ResponseEntity.badRequest().body("Could not update");
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteTodos(@RequestBody ProjectRequestDto todosRequestDto){
        Boolean succeed = projectFacades.deleteProject(todosRequestDto);
        return succeed ? ResponseEntity.ok("Deleted"): ResponseEntity.badRequest().body("Could not delete");
    }

}
