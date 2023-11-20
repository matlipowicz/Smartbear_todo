package com.smartbear.backend.service;

public interface EmailSenderService {
    void sendEmail(String toMail,String subject, String message);
}
