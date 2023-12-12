package com.target.api.target.controller;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.facades.request.TodoRequestDto;
import com.target.api.target.facades.todos.TodoFacades;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/todo",method = RequestMethod.GET)
public class TodoController {

    @Resource(name = "todoFacades")
    private TodoFacades todoFacade;

    @PostMapping("/create")
    public TodoDto createTodo(@Valid @RequestBody TodoRequestDto todoRequestDto){
        return todoFacade.createTodo(todoRequestDto);
    }

    @GetMapping("/all/{code}")
    public List<TodoDto> getTodos(@PathVariable String code){
        return todoFacade.getTodoList(code);
    }

    @PostMapping("/update")
    public TodoDto updateTodo(@Valid @RequestBody TodoRequestDto todoRequestDto){
        return todoFacade.updateTodo(todoRequestDto);
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteTodos(@RequestBody TodoRequestDto todoRequestDto){
        Boolean succeed = todoFacade.deleteTodo(todoRequestDto);
        return succeed ? ResponseEntity.ok("Deleted"): ResponseEntity.badRequest().body("Could not delete");
    }

}
