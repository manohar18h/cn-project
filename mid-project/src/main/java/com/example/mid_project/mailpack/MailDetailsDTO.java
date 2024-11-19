package com.example.mid_project.mailpack;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailDetailsDTO {
    @Getter@Setter
    private String fileName;
    @Getter@Setter
    private String toMail;
    @Getter@Setter
    private Long fileId;
}
