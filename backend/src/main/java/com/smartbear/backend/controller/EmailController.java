package com.smartbear.backend.controller;

import com.smartbear.backend.resource.EmailMessage;
import com.smartbear.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity sendEmail(@RequestBody EmailMessage emailMessage){
        this.emailService.sendEmail(emailMessage.getToMail(), emailMessage.getSubject(), emailMessage.getMessage());
        return ResponseEntity.ok("Success, mail send");
    }
}
