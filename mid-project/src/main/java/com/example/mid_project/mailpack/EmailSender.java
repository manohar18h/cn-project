package com.example.mid_project.mailpack;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;

@Service
public class EmailSender {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${emails.sender_email}")
    private String senderEmail;

    @Value("${emails.sender_name}")
    private String senderName;

    @Value("${emails.sender_address}")
    private String senderAddress;


    public void sendEmailWithAttachment(String receiverEmail, String subject, String content, String fileName, byte[] fileData) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(receiverEmail);
        helper.setFrom(senderEmail);
        helper.setSubject(subject);
        helper.setText(content);

        // Save the file temporarily to attach it
        File tempFile = new File(fileName);
        try {
            Files.write(tempFile.toPath(), fileData);
            helper.addAttachment(fileName, tempFile);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            throw new MessagingException("Failed to attach and send the file", e);
        } finally {
            // Clean up temporary file
            tempFile.delete();
        }
    }

    public void sendEmail(String receiverEmail, String subject, String content){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(receiverEmail);
            message.setFrom(senderEmail);
            message.setSubject(subject);
            message.setText(content);

            javaMailSender.send(message);
            System.out.println("Email sent correctly");
        }catch (Exception e){
            System.out.println("Exception in SentEmailSender");
            e.printStackTrace();
        }
    }
}
