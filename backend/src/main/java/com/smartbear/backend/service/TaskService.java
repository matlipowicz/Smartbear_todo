package com.smartbear.backend.service;

import com.smartbear.backend.exceptions.TaskNotFoundException;
import com.smartbear.backend.model.Task;
import com.smartbear.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    public Optional<Task> getTask(Long id){
        return taskRepository.findById(id);
    }

    public Task postTask(Task task){
            return taskRepository.save(task);
    }

    public Task patchTask(Long id, Task task){
        Optional<Task> existingTask = taskRepository.findById(id);

        if(existingTask.isPresent()){
         Task updatedTask = existingTask.get();
            updatedTask.setTask_title(task.getTask_title());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setDone(task.getDone());
            updatedTask.setPriority(task.getPriority());
            updatedTask.setScheduledOn(task.getScheduledOn());
            updatedTask.setTime(task.getTime());
            updatedTask.setFinalDate(task.getFinalDate());
            updatedTask.setCategoryClr(task.getCategoryClr());
            updatedTask.setColorValue(task.getColorValue());

            return taskRepository.save(updatedTask);
        }else{
            throw new RuntimeException("Task" + id + "not found");
        }


    }

    public void deleteTask(Long id){
        Optional<Task> existingTask = taskRepository.findById(id);

        if(existingTask.isPresent()){
            taskRepository.deleteById(id);
        }else{
            throw new TaskNotFoundException();
        }

    }
}
