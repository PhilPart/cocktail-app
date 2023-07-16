package com.cocktail;

import com.cocktail.config.WebSecurityConfig;
import com.cocktail.entity.User;
import com.cocktail.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "user@mycompany.com", WebSecurityConfig.USER)
    );
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });
        log.info("Database initialized");
    }
}