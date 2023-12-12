package com.target.api.target.controller;

import com.target.api.target.dto.ContainerDto;
import com.target.api.target.facades.pack.ContainerFacade;
import com.target.api.target.facades.request.BadgeRequestDto;
import com.target.api.target.facades.request.ContainerReplaceDto;
import com.target.api.target.facades.request.ContainerRequestDto;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/container",method = RequestMethod.GET)
public class ContainerController {

    @Resource(name = "containerFacade")
    private ContainerFacade containerFacade;
    @GetMapping("/{code}")
    public ContainerDto getContainer(@PathVariable String code){
        return containerFacade.getContainer(code);
    }

    @PostMapping("/create")
    public ContainerDto createContainer(@Valid @RequestBody ContainerRequestDto containerRequestDto){
        return containerFacade.createContainer(containerRequestDto);
    }

    @PostMapping("/update")
    public ContainerDto updateContainer(@Valid @RequestBody ContainerRequestDto containerRequestDto){
        return containerFacade.updateContainer(containerRequestDto);
    }

    @PostMapping("/replace")
    public Boolean updateProjectContainer(@RequestBody ContainerReplaceDto request){
        return containerFacade.updateProjectContainer(request);
    }

    @PostMapping("/delete")
    public ResponseEntity deleteContainer(@RequestBody ContainerRequestDto containerRequestDto){
        containerFacade.deleteContainer(containerRequestDto);
        return ResponseEntity.ok().build();
    }
}
