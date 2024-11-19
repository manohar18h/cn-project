package com.example.mid_project.adminpack;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface adminDocumentRepository extends JpaRepository<adminHome, Long> {

}