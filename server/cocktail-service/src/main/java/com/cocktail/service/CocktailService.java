package com.cocktail.service;

import com.cocktail.config.WebSecurityConfig;
import com.cocktail.entity.Cocktail;
import com.cocktail.entity.Status;
import com.cocktail.mapper.CocktailMapper;
import com.cocktail.mapper.GlassMapper;
import com.cocktail.mapper.IngredientMapper;
import com.cocktail.model.CocktailDTO;
import com.cocktail.model.FilterForm;
import com.cocktail.model.GlassDTO;
import com.cocktail.model.IngredientDTO;
import com.cocktail.model.PageableCocktailDTO;
import com.cocktail.repository.CocktailRepository;
import com.cocktail.repository.GlassesRepository;
import com.cocktail.repository.IngredientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CocktailService {

    private final CocktailRepository cocktailRepository;

    private final GlassesRepository glassesRepository;

    private final IngredientRepository ingredientRepository;

    private final CocktailMapper cocktailMapper;

    private final GlassMapper glassMapper;

    private final IngredientMapper ingredientMapper;

    public PageableCocktailDTO getAllCocktails(Integer page) {

        PageRequest pageRequest = PageRequest.of(page, 10);

        Page<Cocktail> cocktails = cocktailRepository.findAll(pageRequest);
        List<CocktailDTO> cocktailDtos = cocktails
                .stream()
                .map(cocktailMapper::toDto)
                .toList();
        return PageableCocktailDTO.builder()
                .total(cocktails.getTotalElements())
                .cocktails(cocktailDtos)
                .build();
    }

    @Transactional
    public PageableCocktailDTO getAllCocktails(Integer page, FilterForm filter, Status status) {

        PageRequest pageRequest = PageRequest.of(page, 50, Sort.by("id"));

        if (Objects.isNull(filter)) {
            Page<Cocktail> cocktails = cocktailRepository.findAll(pageRequest);
            List<CocktailDTO> cocktailDtos = cocktails
                    .stream()
                    .map(cocktailMapper::toDto)
                    .toList();
            return PageableCocktailDTO.builder()
                    .total(cocktails.getTotalElements())
                    .cocktails(cocktailDtos)
                    .build();
        } else {
            Page<Long> cocktailIds = cocktailRepository.findByCocktailIngredientsIngredientIdInAndGlassIdInAndNameLike(
                    filter.getSelectedIngredients(),
                    filter.getSelectedGlasses(),
                    filter.getSearchQuery(),
                    status,
                    pageRequest);
            List<Long> ids = cocktailIds.stream().toList();
            List<Cocktail> cocktails;
            if (CollectionUtils.isEmpty(ids)) {
                return PageableCocktailDTO.builder()
                        .total(0)
                        .cocktails(List.of())
                        .build();
            } else {
                cocktails = cocktailRepository.findCocktailsByIdIn(ids);
                List<CocktailDTO> cocktailDtos = cocktails.stream()
                        .map(cocktailMapper::toDto)
                        .toList();
                return PageableCocktailDTO.builder()
                        .total(cocktailIds.getTotalElements())
                        .cocktails(cocktailDtos)
                        .build();
            }
        }

    }

    public List<GlassDTO> getAllGlasses() {
        return glassesRepository.findAll()
                .stream()
                .map(glassMapper::toDto)
                .toList();
    }

    public List<IngredientDTO> getAllIngredients() {
        return ingredientRepository.findAll()
                .stream()
                .map(ingredientMapper::toDto)
                .toList();
    }

    public CocktailDTO getCocktailById(Long id) {
        return cocktailMapper.toDto(cocktailRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cocktail doesn't exist")));
    }

    @Transactional
    public CocktailDTO saveCocktail(CocktailDTO cocktailDTO, Authentication authentication) {
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Cocktail cocktail = cocktailMapper.toModel(cocktailDTO);

        if (roles.contains(WebSecurityConfig.ADMIN)) {
            cocktail.setStatus(Status.APPROVED);
        } else {
            cocktail.setStatus(Status.PENDING);
        }

        cocktail.getCocktailIngredients().forEach(cocktailIngredient -> cocktailIngredient.setCocktail(cocktail));

        Cocktail savedCocktail = cocktailRepository.save(cocktail);

        return cocktailMapper.toDto(savedCocktail);
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public CocktailDTO editCocktail(Long id, CocktailDTO cocktailDTO) {
        Cocktail cocktail = cocktailRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cocktail doesn't exist"));

        Cocktail updatedCocktail = cocktailMapper.toModel(cocktailDTO);

        cocktail.getCocktailIngredients().clear();

        updatedCocktail.getCocktailIngredients().forEach(cocktailIngredient -> cocktail.getCocktailIngredients().add(cocktailIngredient));

        cocktail.setImage(cocktailDTO.getImage());
        cocktail.setName(cocktailDTO.getName());
        cocktail.setGlass(updatedCocktail.getGlass());
        cocktail.setInstruction(updatedCocktail.getInstruction());
        cocktail.getCocktailIngredients().forEach(cocktailIngredient -> cocktailIngredient.setCocktail(cocktail));

        cocktailRepository.save(cocktail);

        return cocktailMapper.toDto(cocktail);
    }

    public void approveCocktail(Long id) {
        Cocktail cocktail = cocktailRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cocktail doesn't exist"));

        cocktail.setStatus(Status.APPROVED);

        cocktailRepository.save(cocktail);
    }

    public void deleteCocktail(Long id) {
        Cocktail cocktail = cocktailRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cocktail doesn't exist"));

        cocktailRepository.delete(cocktail);
    }

}
