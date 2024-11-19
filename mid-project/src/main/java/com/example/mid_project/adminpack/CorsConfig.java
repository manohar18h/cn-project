package com.example.mid_project.adminpack;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS for all endpoints
        .allowedOrigins(
            "http://127.0.0.1:5500/",  // Allow localhost during development
            "https://cn-project-8c89c.web.app"  // Add your Firebase deployed URL
        )
        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Specify allowed HTTP methods
        .allowedHeaders("*")  // Allow any headers
        .allowCredentials(true); 
    }
}