package com.target.api.target.controller;

import com.target.api.target.dto.TodosDto;
import com.target.api.target.facades.request.TodosRequestDto;
import com.target.api.target.facades.todos.TodosFacades;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/todos",method = RequestMethod.GET)
public class TodosController {

    @Resource(name = "todosFacades")
    private TodosFacades todosFacades;

    @PostMapping("/create")
    public ResponseEntity<String> createTodos(@RequestBody TodosRequestDto todosRequestDto){
        todosFacades.createTodoList(todosRequestDto);
        return ResponseEntity.ok("Created");
    }

    @GetMapping("/all/{owner}")
    public List<TodosDto> getTodos(@PathVariable String owner){
        return todosFacades.getTodosByOwner(owner);
    }

    @GetMapping("/get/{code}")
    public TodosDto getTodosByCode(@PathVariable("code") String code){
        return todosFacades.getTodosByCode(code);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTodos(@RequestBody TodosRequestDto todosRequestDto){
        Boolean succeed = todosFacades.updateTodoList(todosRequestDto);
        return succeed ? ResponseEntity.ok("Updated"): ResponseEntity.badRequest().body("Could not update");
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteTodos(@RequestBody TodosRequestDto todosRequestDto){
        Boolean succeed = todosFacades.deleteTodoList(todosRequestDto);
        return succeed ? ResponseEntity.ok("Deleted"): ResponseEntity.badRequest().body("Could not delete");
    }

}
