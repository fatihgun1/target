package com.target.api.target.controller;

import com.target.api.target.dto.ProjectDto;
import com.target.api.target.facades.request.TodosRequestDto;
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
    public ResponseEntity<String> createTodos(@Valid @RequestBody TodosRequestDto todosRequestDto){
        projectFacades.createTodoList(todosRequestDto);
        return ResponseEntity.ok("Created");
    }

    @GetMapping("/all/{owner}")
    public List<ProjectDto> getTodos(@PathVariable String owner){
        return projectFacades.getTodosByOwner(owner);
    }

    @GetMapping("/get/{code}")
    public ProjectDto getTodosByCode(@PathVariable("code") String code){
        return projectFacades.getTodosByCode(code);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTodos(@Valid @RequestBody TodosRequestDto todosRequestDto){
        Boolean succeed = projectFacades.updateTodoList(todosRequestDto);
        return succeed ? ResponseEntity.ok("Updated"): ResponseEntity.badRequest().body("Could not update");
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteTodos(@RequestBody TodosRequestDto todosRequestDto){
        Boolean succeed = projectFacades.deleteTodoList(todosRequestDto);
        return succeed ? ResponseEntity.ok("Deleted"): ResponseEntity.badRequest().body("Could not delete");
    }

}
