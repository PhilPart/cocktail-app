package com.cocktail.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueCocktailNameValidator.class)
public @interface UniqueCocktailName {

    String message() default "Cocktail name is already in use.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
