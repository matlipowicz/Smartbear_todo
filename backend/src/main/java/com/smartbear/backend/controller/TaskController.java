package com.smartbear.backend.controller;

import com.smartbear.backend.model.Task;
import com.smartbear.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping
public class TaskController {


    private final TaskService taskService;


    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/todos")
    public List<Task> getAllTasks() {
            return taskService.getAll();
    }


    @GetMapping("/todos/{id}")
    public Task getSingleTask(@PathVariable Long id){
        return taskService.getTask(id);
    }

    @PostMapping("/todos")
    public Task createTask(@RequestBody Task task){
        return taskService.postTask(task);
    }

    @PatchMapping("/todos/{id}")
    public Task patchingTask(@PathVariable Long id, @RequestBody Task task){
        return taskService.patchTask(id,task);
    }

    @DeleteMapping("/todos/{id}")
    public void deletingTask(@PathVariable Long id){
         taskService.deleteTask(id);
    }

}
