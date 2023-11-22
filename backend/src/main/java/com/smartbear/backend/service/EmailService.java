package com.smartbear.backend.service;
import com.smartbear.backend.repository.TaskRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService implements  EmailSenderService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("kapibarataskiara@gmail.com")
    private String senderEmail;



    public void sendEmail(String toMail, String subject, String message) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(senderEmail);
            simpleMailMessage.setTo(toMail);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(message);

            javaMailSender.send(simpleMailMessage);

            System.out.println("Message has been sent!");
        }catch(Exception e){
            System.out.println("Email not sent");
        }

    }
}
