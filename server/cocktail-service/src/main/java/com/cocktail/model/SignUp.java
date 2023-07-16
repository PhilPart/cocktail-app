package com.cocktail.model;

import com.cocktail.validation.Password;
import com.cocktail.validation.UniqueEmail;
import com.cocktail.validation.Username;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUp {

    @NotBlank(message = "Username can't be blank.")
    @Username
    private String username;

    @NotBlank(message = "Password can't be blank.")
    @Password
    private String password;

    @NotBlank(message = "Email can't be blank.")
    @Email
    @UniqueEmail
    private String email;
}