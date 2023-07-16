package com.cocktail.service;

import com.cocktail.config.WebSecurityConfig;
import com.cocktail.entity.User;
import com.cocktail.model.AuthResponse;
import com.cocktail.model.SignIn;
import com.cocktail.model.SignUp;
import com.cocktail.repository.UserRepository;
import com.cocktail.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final PasswordEncoder encoder;

    private final TokenProvider tokenProvider;

    public AuthResponse loginUser(SignIn loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());

        return new AuthResponse(token);
    }

    public void saveUser(SignUp signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));

        user.setRole(WebSecurityConfig.USER);

        userRepository.save(user);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }

}