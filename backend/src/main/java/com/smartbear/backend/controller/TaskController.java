package com.smartbear.backend.controller;

import com.smartbear.backend.exceptions.BadRequestException;
import com.smartbear.backend.exceptions.TaskNotFoundException;
import com.smartbear.backend.model.Task;
import com.smartbear.backend.service.TodoEmailSchedulerService;
import com.smartbear.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// TODO: Return updated or posted data in body response to render it on frontend instead of refetching it

@RestController
@RequestMapping("todos")
public class TaskController {

    private TodoEmailSchedulerService todoEmailSchedulerService;
    private final TaskService taskService;


    public TaskController(TodoEmailSchedulerService todoEmailSchedulerService, TaskService taskService) {
        this.todoEmailSchedulerService = todoEmailSchedulerService;
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(taskService.getAll());
        } catch (Exception e){
            throw new BadRequestException();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getSingleTask(@PathVariable Long id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(taskService.getTask(id));
        }catch(Exception e){
            throw new TaskNotFoundException();
        }
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(taskService.postTask(task));
        } catch (Exception e){
            throw new BadRequestException();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Task> patchingTask(@PathVariable Long id, @RequestBody Task task){
        try{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(taskService.patchTask(id,task));
        } catch (Exception e){
            throw new BadRequestException();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deletingTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }



}
