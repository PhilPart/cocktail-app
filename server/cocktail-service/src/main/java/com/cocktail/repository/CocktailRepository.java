package com.cocktail.repository;

import com.cocktail.entity.Cocktail;
import com.cocktail.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CocktailRepository extends PagingAndSortingRepository<Cocktail, Long>, JpaRepository<Cocktail, Long> {

    @EntityGraph(attributePaths = {"glass", "cocktailIngredients.ingredient"}, type = EntityGraph.EntityGraphType.FETCH)
    @Query("""
            SELECT distinct c.id FROM Cocktail c INNER JOIN c.cocktailIngredients cocktailIngredients
            WHERE (:#{#ingredients == null} = true OR cocktailIngredients.ingredient.id IN (:ingredients))
            AND (:#{#glasses == null} = true OR c.glass.id IN (:glasses))
            AND (:name IS NULL OR c.name LIKE %:name%)
            AND c.status = :status""")
    Page<Long> findByCocktailIngredientsIngredientIdInAndGlassIdInAndNameLike(@Param("ingredients") List<Long> ingredients,
                                                                              @Param("glasses") List<Long> glasses,
                                                                              @Param("name") String name,
                                                                              @Param("status") Status status,
                                                                              Pageable pageable);


    List<Cocktail> findCocktailsByIdIn(@Param("ids") List<Long> ids);

    Boolean existsByName(String name);
}
