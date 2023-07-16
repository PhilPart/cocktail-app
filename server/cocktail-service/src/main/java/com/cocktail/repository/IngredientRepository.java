package com.cocktail.repository;

import com.cocktail.entity.Cocktail;
import com.cocktail.entity.Glass;
import com.cocktail.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IngredientRepository extends PagingAndSortingRepository<Ingredient, Long>, JpaRepository<Ingredient, Long> {

    @Query(
            value = """
                    select p.id
                    from Ingredient p
                    where p.id in (:ids)
                    """,
            countQuery = """
                    select count(p)
                    from Ingredient p
                    where p.id in (:ids)
                    """
    )
    List<Long> findAllIngredientIdsByTitle(
            @Param("ids") List<String> ids,
            Pageable pageable
    );

}
