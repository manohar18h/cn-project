package com.example.mid_project.userPack;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "UserDataTable")
@AllArgsConstructor
@NoArgsConstructor
public class Usermodel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Setter @Getter
    String name;
    @Setter @Getter
    String userName;
    @Setter @Getter
    String password;
     @Getter
    String confirmPassword;
    @Setter @Getter
    String emailId;

}
