package com.cocktail.validation;

import com.cocktail.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UsernameValidator implements ConstraintValidator<Username, String> {

    private final UserRepository userRepository;

    @Autowired
    public UsernameValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {

        if (!userRepository.existsByUsername(s)) {
            Pattern pattern = Pattern.compile("^[A-Za-z][A-Za-z0-9_]{4,29}$");
            Matcher matcher = pattern.matcher(s);

            boolean isUsernameValid = matcher.find();

            if (!isUsernameValid) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext
                        .buildConstraintViolationWithTemplate("""
                                Invalid username. Please ensure it meets the following requirements:
                                  Starts with a letter (uppercase or lowercase), followed by letters, digits, or underscores.
                                  Length should be between 5 and 30 characters.
                                  """)
                        .addConstraintViolation();
            }

            return isUsernameValid;
        } else {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext
                    .buildConstraintViolationWithTemplate("Username is already taken.")
                    .addConstraintViolation();
        }

        return false;
    }
}
