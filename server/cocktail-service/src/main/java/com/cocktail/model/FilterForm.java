package com.cocktail.model;

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
public class FilterForm {

    private String searchQuery;

    private List<Long> selectedGlasses;

    private List<Long> selectedIngredients;

}
