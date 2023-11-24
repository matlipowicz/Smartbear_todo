package com.smartbear.backend.service;

import com.smartbear.backend.model.Task;
import com.smartbear.backend.repository.TaskRepository;
import com.smartbear.backend.service.impl.EmailSenderServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.*;
import java.util.ArrayList;
import java.util.List;


@Service
public class TodoEmailSchedulerService {


    public TaskRepository taskRepository;


    private final EmailSenderServiceImpl emailSenderServiceImpl;


    public TodoEmailSchedulerService(TaskRepository taskRepository, EmailSenderServiceImpl emailSenderServiceImpl) {
        this.taskRepository = taskRepository;
        this.emailSenderServiceImpl = emailSenderServiceImpl;
    }

    public List<Task> getAllTasks(){

        LocalDate todayDate = LocalDate.now();

        System.out.println(todayDate);

        List<Task> tasks = taskRepository.findAll();
        List<Task> testList = new ArrayList<>();
        for(Task task: tasks){
            if(!task.getDone()){
                LocalDate todayTaskDate = task.getFinalDate().toLocalDate();
                if (todayDate.equals(todayTaskDate)){
                    testList.add(task);
                }
            }
        }

        return testList;
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendNotification(){
        var tasks = getAllTasks();
        var tasksSize = tasks.size();
        var message = "You have " + tasksSize + " to go, keep it up";
        var toReceiver = "kapibarataskiara@gmail.com";
        var subject = "Pending tasks in KapibaraDo app";

        try{
            emailSenderServiceImpl.sendEmail(toReceiver,subject,message);
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("Email sent successfully");
        }
    }


}
