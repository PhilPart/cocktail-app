package com.cocktail.mapper;

import com.cocktail.entity.Ingredient;
import com.cocktail.model.IngredientDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    IngredientDTO toDto(Ingredient user);

    Ingredient toModel(IngredientDTO user);
}
