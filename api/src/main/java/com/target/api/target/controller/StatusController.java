package com.target.api.target.controller;

import com.target.api.target.dto.StatusDto;
import com.target.api.target.facades.request.StatusRequestDto;
import com.target.api.target.facades.todos.StatusFacades;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/authenticated/status",method = RequestMethod.GET)
public class StatusController {

    @Resource(name = "statusFacades")
    private StatusFacades statusFacades;

    @PostMapping("/create")
    public StatusDto createStatus(@Valid @RequestBody StatusRequestDto statusRequestDto){
        return statusFacades.createStatus(statusRequestDto);
    }

    @PostMapping("/update")
    public StatusDto updateStatus(@Valid @RequestBody StatusRequestDto statusRequestDto){
        return statusFacades.updateStatus(statusRequestDto);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteStatus(@RequestBody StatusRequestDto statusRequestDto){
        Boolean succeed = statusFacades.deleteStatus(statusRequestDto);
        return succeed ? ResponseEntity.ok("Updated") : ResponseEntity.ok("Could not update");
    }
}
