package com.example.mid_project.mailpack;


import com.example.mid_project.adminpack.adminDocService;
import com.example.mid_project.adminpack.adminHome;
import com.example.mid_project.userPack.UserRepo;
import com.example.mid_project.userPack.UserServices;
import com.example.mid_project.userPack.Usermodel;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("documents/mail")
@CrossOrigin
public class MailController {


    @Autowired
    private EmailSender emailSender;

    @Autowired
    private UserServices userServices;

    @Autowired
    private adminDocService documentService;

    @Autowired
    private UserRepo userRepository;

    @PostMapping("/sendWithAttachment")
    public String sendEmailWithAttachment(@RequestBody MailDetailsDTO mailDetailsDTO) {
        try {
            String toMail = mailDetailsDTO.getToMail();
            Long fileId = mailDetailsDTO.getFileId();

            // Fetch the file from the database using fileId
            Optional<adminHome> documentOptional = documentService.getDocumentById(fileId);
            if (documentOptional.isEmpty()) {
                return "File not found with ID: " + fileId;
            }

            adminHome document = documentOptional.get();
            String fileName = document.getFilename();
            byte[] fileData = document.getFileData();

            // Send email with attachment
            emailSender.sendEmailWithAttachment(
                    toMail,
                    "Document",
                    "You got a new file: " + fileName + ".\n\n" +
                            "Please check the attached file below.\n\n" +
                            "Best regards,\nFile Transfer",
                    fileName,
                    fileData
            );

            return "Email sent successfully with attachment!";
        } catch (MessagingException e) {
            return "Error sending email: " + e.getMessage();
        }
    }




    @GetMapping("/sendAllEmails")
    public String sendEmailsToAllUsers() {
        try {
            // Fetch all users from the database
            List<Usermodel> users = userRepository.findAll();

            // Loop through all users and send the email
            for (Usermodel user : users) {
                String recipientEmail = user.getEmailId();// Replace with the actual filename or pass it dynamically

                System.out.println(recipientEmail);
                // Compose the email body
                String emailBody = "The admin has uploaded a new file: "  + ".\n" +
                        "\n" +
                        "Please log in to your account to view and use the file.\n" +
                        "\n" +
                        "If you have any questions or encounter any issues, feel free to contact support.\n" +
                        "\n" +
                        "Best regards,\n" +
                        "File Transfer";

                // Send the email
                emailSender.sendEmail(recipientEmail, "New File Uploaded", emailBody);
            }

            return "Emails sent successfully to all users.";

        } catch (Exception e) {
            return "Error occurred: " + e.getMessage();
        }
    }





}
