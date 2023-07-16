package com.cocktail.model;

import com.cocktail.entity.Status;
import com.cocktail.validation.UniqueCocktailName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CocktailDTO {

    private Long id;

    @PositiveOrZero
    private Long glass;

    private String glassName;

    private int glassSize;

    @NotEmpty
    private List<CocktailIngredientDTO> cocktailIngredients;

    @NotBlank
    @UniqueCocktailName
    private String name;

    @NotBlank
    private String image;

    @NotBlank
    private String instruction;

    private Status status;

}
