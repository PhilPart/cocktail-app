package com.cocktail.repository;

import com.cocktail.entity.Glass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GlassesRepository extends JpaRepository<Glass, Long> {

}
