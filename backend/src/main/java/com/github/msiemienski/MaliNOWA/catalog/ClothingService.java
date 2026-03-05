package com.github.msiemienski.MaliNOWA.catalog;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClothingService {

    private final ClothingRepository clothingRepository;

    public List<Clothing> getAll() {
        return clothingRepository.findAll();
    }

    public Clothing getById(Long id) {
        return clothingRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Clothing not found"));
    }

    public Clothing create(CreateClothingRequest request) {
        Clothing clothing = new Clothing();
        clothing.setName(request.name());
        clothing.setCategory(request.category());
        clothing.setDescription(request.description());
        clothing.setPrice(request.price());
        clothing.setImageUrl(request.imageUrl());
        clothing.setStock(request.stock());
        clothing.setSize(request.size());
        clothing.setFeatured(request.featured());

        return clothingRepository.save(clothing);
    }
}
