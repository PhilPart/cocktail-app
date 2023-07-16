package com.cocktail.controller;

import com.cocktail.model.AuthResponse;
import com.cocktail.model.MessageResponse;
import com.cocktail.model.SignIn;
import com.cocktail.model.SignUp;
import com.cocktail.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "Auth", description = "All operations for auth user.")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody SignIn signIn) {
        return ResponseEntity.ok(authService.loginUser(signIn));
    }

    @PostMapping("/signup")
    @Operation(summary = "Register user", description = "Registers user with username, email and password. Username and email must be unique." + "Password must contain min. 1 special character, 1 capital letter, 1 lower case letter and 1 number")
    @ApiResponse(responseCode = "200", description = "User registered")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignUp signUp) {
        authService.saveUser(signUp);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}