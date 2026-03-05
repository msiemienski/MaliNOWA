package com.github.msiemienski.MaliNOWA.catalog;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clothes")
@RequiredArgsConstructor
public class ClothingController {

    private final ClothingService clothingService;

    @GetMapping
    public List<Clothing> getAll() {
        return clothingService.getAll();
    }

    @GetMapping("/{id}")
    public Clothing getById(@PathVariable Long id) {
        return clothingService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Clothing create(@Valid @RequestBody CreateClothingRequest request) {
        return clothingService.create(request);
    }
}
