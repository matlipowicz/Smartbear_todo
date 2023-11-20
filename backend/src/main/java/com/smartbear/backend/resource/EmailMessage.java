package com.smartbear.backend.resource;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class EmailMessage {

    private String toMail;
    private String subject;
    private String message;

    public EmailMessage(String toMail, String subject, String message) {
        this.toMail = toMail;
        this.subject = subject;
        this.message = message;
    }
}

