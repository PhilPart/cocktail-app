package com.cocktail.mapper;

import com.cocktail.entity.User;
import com.cocktail.model.SignUp;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SignUpMapper {

    User toModel(SignUp userRegisterDTO);
}
