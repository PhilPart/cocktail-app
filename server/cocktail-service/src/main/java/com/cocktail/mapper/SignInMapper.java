package com.cocktail.mapper;

import com.cocktail.entity.User;
import com.cocktail.model.SignIn;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SignInMapper {

    SignIn toDto(User user);
}
