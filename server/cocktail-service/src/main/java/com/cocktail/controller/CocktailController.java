package com.cocktail.controller;

import com.cocktail.entity.Ingredient;
import com.cocktail.entity.Status;
import com.cocktail.model.CocktailDTO;
import com.cocktail.model.FilterForm;
import com.cocktail.model.GlassDTO;
import com.cocktail.model.IngredientDTO;
import com.cocktail.model.PageableCocktailDTO;
import com.cocktail.service.CocktailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cocktails")
@Tag(name = "Cocktail", description = "All operations for cocktail.")
public class CocktailController {

    private final CocktailService cocktailService;

    @GetMapping("/glasses")
    @Operation(summary = "Find all", description = "Find all cocktails")
    @ApiResponse(responseCode = "200", description = "Cocktails found", content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = CocktailDTO.class))))
    public ResponseEntity<List<GlassDTO>> getAllGlasses() {
        return new ResponseEntity<>(cocktailService.getAllGlasses(), HttpStatus.OK);
    }

    @GetMapping("/ingredients")
    @Operation(summary = "Find all", description = "Find all cocktails")
    @ApiResponse(responseCode = "200", description = "Cocktails found", content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = CocktailDTO.class))))
    public ResponseEntity<List<IngredientDTO>> getAllIngredients() {
        return new ResponseEntity<>(cocktailService.getAllIngredients(), HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "Find all", description = "Find all cocktails")
    @ApiResponse(responseCode = "200", description = "Cocktails found", content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = CocktailDTO.class))))
    public ResponseEntity<PageableCocktailDTO> getAllCocktails(@RequestParam(defaultValue = "0") Integer page) {
        return new ResponseEntity<>(cocktailService.getAllCocktails(page), HttpStatus.OK);
    }

    @PostMapping("/query")
    @Operation(summary = "Find all", description = "Find all filtered cocktails")
    @ApiResponse(responseCode = "200", description = "Cocktails found", content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = CocktailDTO.class))))
    public ResponseEntity<PageableCocktailDTO> getAllFilteredCocktails(@RequestParam(defaultValue = "0") Integer page,
                                                                       @RequestParam(defaultValue = "APPROVED") Status status,
                                                                       @Valid @RequestBody FilterForm filter) {
        return new ResponseEntity<>(cocktailService.getAllCocktails(page, filter, status), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Find by id", description = "Finds cocktail by ID")
    @ApiResponse(responseCode = "200", description = "Cocktail found", content = @Content(schema = @Schema(implementation = CocktailDTO.class), mediaType = "application/json"))
    public ResponseEntity<CocktailDTO> getCocktailById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(cocktailService.getCocktailById(id), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Save", description = "Save cocktail")
    @ApiResponse(responseCode = "201", description = "Cocktail created",
            content = @Content(schema = @Schema(implementation = CocktailDTO.class), mediaType = "application/json"))
    public ResponseEntity<CocktailDTO> saveCocktail(@Valid @RequestBody CocktailDTO cocktail, Authentication authentication) {
        return new ResponseEntity<>(cocktailService.saveCocktail(cocktail, authentication), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Edit", description = "Edit cocktail by ID")
    @ApiResponse(responseCode = "200", description = "Cocktail edited",
            content = @Content(schema = @Schema(implementation = CocktailDTO.class), mediaType = "application/json"))
    public ResponseEntity<CocktailDTO> editCocktail(@PathVariable("id") Long id,
                                                    @Valid @RequestBody CocktailDTO cocktail) {
        return new ResponseEntity<>(cocktailService.editCocktail(id, cocktail), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete", description = "Delete cocktail by ID")
    @ApiResponse(responseCode = "200", description = "Cocktail deleted",
            content = @Content(schema = @Schema(implementation = CocktailDTO.class), mediaType = "application/json"))
    public ResponseEntity<Void> deleteCocktail(@PathVariable("id") Long id) {
        cocktailService.deleteCocktail(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}/approve")
    @Operation(summary = "Approve", description = "Approve cocktail by ID")
    @ApiResponse(responseCode = "200", description = "Cocktail approved",
            content = @Content(schema = @Schema(implementation = CocktailDTO.class), mediaType = "application/json"))
    public ResponseEntity<Void> approveCocktail(@PathVariable("id") Long id) {
        cocktailService.approveCocktail(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
