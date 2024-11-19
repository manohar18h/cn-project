package com.example.mid_project.userPack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    private UserRepo userRepository;



    public Usermodel registerUser(Usermodel user) {
        if (user.getPassword().equals(user.getConfirmPassword())) {
            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Passwords do not match.");
        }
    }

    public Optional<Usermodel> login(String userName, String password) {
        return userRepository.findByUserName(userName)
                .filter(user -> user.getPassword().equals(password));
    }
}
