package com.cocktail.validation;

import com.cocktail.repository.CocktailRepository;
import com.cocktail.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueCocktailNameValidator implements ConstraintValidator<UniqueCocktailName, String> {

    private final CocktailRepository cocktailRepository;

    @Autowired
    public UniqueCocktailNameValidator(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return !cocktailRepository.existsByName(s);
    }
}
