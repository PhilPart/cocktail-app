package com.cocktail.mapper;

import com.cocktail.entity.Cocktail;
import com.cocktail.entity.CocktailIngredient;
import com.cocktail.entity.Ingredient;
import com.cocktail.model.CocktailDTO;
import com.cocktail.model.CocktailIngredientDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CocktailMapper {

    @Mapping(source = "glass.id", target = "glass")
    @Mapping(source = "glass.name", target = "glassName")
    @Mapping(source = "glass.size", target = "glassSize")
    CocktailDTO toDto(Cocktail cocktail);

    @Mapping(source = "glass", target = "glass.id")
    @Mapping(target = "glass.name", source = "glassName", ignore = true)
    @Mapping(target = "glass.size", source = "glassSize", ignore = true)
    Cocktail toModel(CocktailDTO cocktail);

    @Mapping(source = "glass", target = "glass.id")
    @Mapping(target = "glass.name", source = "glassName", ignore = true)
    @Mapping(target = "glass.size", source = "glassSize", ignore = true)
    void update(@MappingTarget Cocktail entity, CocktailDTO updateEntity);


    default Ingredient map(Long value) {
        return new Ingredient(value, null, null);
    }

    default CocktailIngredientDTO cocktailIngredientToCocktailIngredientDTO(CocktailIngredient cocktailIngredient) {
        if (cocktailIngredient == null) {
            return null;
        }

        CocktailIngredientDTO cocktailIngredientDTO = new CocktailIngredientDTO();

        cocktailIngredientDTO.setIngredient(cocktailIngredient.getIngredient().getId());
        cocktailIngredientDTO.setName(cocktailIngredient.getIngredient().getName());
        cocktailIngredientDTO.setAmount(cocktailIngredient.getAmount());

        return cocktailIngredientDTO;
    }

}
