package com.example.mid_project.adminpack;

import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.User;



@Data
@Entity
@Table(name = "MidProject")
@AllArgsConstructor
@NoArgsConstructor
public class adminHome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Getter @Setter
    private String filename;


    @Lob
    private byte[] fileData;
}
