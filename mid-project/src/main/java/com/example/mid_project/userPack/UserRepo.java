package com.example.mid_project.userPack;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  UserRepo  extends JpaRepository<Usermodel, Long> {
    Optional<Usermodel> findByUserName(String userName);
    Optional<Usermodel> findByEmailId(String emailId);
}
