package com.target.api.target.controller;

import com.target.api.target.facades.request.StatusRequestDto;
import com.target.api.target.facades.todos.StatusFacades;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/status",method = RequestMethod.GET)
public class StatusController {

    @Resource(name = "statusFacades")
    private StatusFacades statusFacades;

    @PostMapping("/create")
    public ResponseEntity<String> createStatus(@RequestBody StatusRequestDto statusRequestDto){
        statusFacades.createStatus(statusRequestDto);
        return ResponseEntity.ok("Created");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateStatus(@RequestBody StatusRequestDto statusRequestDto){
        Boolean succeed = statusFacades.updateStatus(statusRequestDto);
        return succeed ? ResponseEntity.ok("Updated") : ResponseEntity.ok("Could not update");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteStatus(@RequestBody StatusRequestDto statusRequestDto){
        Boolean succeed = statusFacades.deleteStatus(statusRequestDto);
        return succeed ? ResponseEntity.ok("Updated") : ResponseEntity.ok("Could not update");
    }
}
