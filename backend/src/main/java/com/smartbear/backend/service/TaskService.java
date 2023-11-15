package com.smartbear.backend.service;

import com.smartbear.backend.model.Task;
import com.smartbear.backend.repository.TaskRepository2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    public TaskService(TaskRepository2 taskRepository2) {
        this.taskRepository2 = taskRepository2;
    }

    private final TaskRepository2 taskRepository2;
    public List<Task> getAll(){
        return taskRepository2.findAll();
    }
}
