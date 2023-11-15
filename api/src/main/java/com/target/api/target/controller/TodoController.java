package com.target.api.target.controller;

import com.target.api.target.dto.TodoDto;
import com.target.api.target.facades.request.TodoRequestDto;
import com.target.api.target.facades.todos.TodoFacade;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/todo",method = RequestMethod.GET)
public class TodoController {

    @Resource(name = "todoFacades")
    private TodoFacade todoFacade;

    @PostMapping("/create")
    public ResponseEntity<String> createTodos(@RequestBody TodoRequestDto todoRequestDto){
        todoFacade.createTodo(todoRequestDto);
        return ResponseEntity.ok("Created");
    }

    @GetMapping("/all/{code}")
    public List<TodoDto> getTodos(@PathVariable String code){
        return todoFacade.getTodoList(code);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTodos(@RequestBody TodoRequestDto todoRequestDto){
        Boolean succeed = todoFacade.updateTodo(todoRequestDto);
        return succeed ? ResponseEntity.ok("Updated"): ResponseEntity.badRequest().body("Could not update");
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteTodos(@RequestBody TodoRequestDto todoRequestDto){
        Boolean succeed = todoFacade.deleteTodo(todoRequestDto);
        return succeed ? ResponseEntity.ok("Deleted"): ResponseEntity.badRequest().body("Could not delete");
    }

}
