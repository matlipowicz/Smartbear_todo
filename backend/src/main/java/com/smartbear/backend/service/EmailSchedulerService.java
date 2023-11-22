package com.smartbear.backend.service;

import com.smartbear.backend.config.JavaMailSender;
import com.smartbear.backend.model.Task;
import com.smartbear.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class EmailSchedulerService {


    public TaskRepository taskRepository;


    private final EmailService emailService;


    public EmailSchedulerService(TaskRepository taskRepository, EmailService emailService) {
        this.taskRepository = taskRepository;
        this.emailService = emailService;
    }

    public List<Task> getAllTasks(){

        LocalDate todayDate = LocalDate.now();

        System.out.println(todayDate);

        List<Task> tasks = taskRepository.findAll();
        List<Task> testList = new ArrayList<>();
        for(Task task: tasks){
            if(!task.getDone()){
                LocalDate todayTaskDate = task.getFinalDate().toLocalDate();
                if(todayDate.equals(todayTaskDate)){
                    testList.add(task);
                }
            }
        }

        return testList;
    }

    @Scheduled(cron = "0 0 21 * * ?")
    public void sendNotification(){
        var tasks = getAllTasks();
        var tasksSize = tasks.size();
        var message = "You have " + tasksSize + " to go, keep it up";
        var toReceiver = "kapibarataskiara@gmail.com";
        var subject = "Pending tasks in KapibaraDo app";

        try{
            emailService.sendEmail(toReceiver,subject,message);
        }catch(Exception e){
            e.printStackTrace();
        }
    }


}
