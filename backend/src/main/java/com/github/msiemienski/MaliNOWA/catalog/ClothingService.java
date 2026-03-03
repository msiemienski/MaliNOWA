package com.github.msiemienski.MaliNOWA.catalog;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClothingService {

    private final ClothingRepository clothingRepository;

    public List<Clothing> getAll() {
        return clothingRepository.findAll();
    }

    public Clothing create(CreateClothingRequest request) {
        Clothing clothing = new Clothing();
        Integer stock = request.stock();
        clothing.setName(request.name());
        clothing.setCategory(request.category());
        clothing.setDescription(request.description());
        clothing.setPrice(request.price());
        clothing.setImageUrl(request.imageUrl());
        clothing.setStock(stock != null ? stock : 0);
        clothing.setFeatured(request.featured());

        return clothingRepository.save(clothing);
    }
}
