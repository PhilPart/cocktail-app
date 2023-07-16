package com.cocktail.mapper;

import com.cocktail.entity.Cocktail;
import com.cocktail.entity.Glass;
import com.cocktail.model.CocktailDTO;
import com.cocktail.model.GlassDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GlassMapper {

    GlassDTO toDto(Glass user);

    Glass toModel(GlassDTO user);
}
