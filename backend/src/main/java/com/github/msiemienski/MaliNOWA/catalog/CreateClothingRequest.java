package com.github.msiemienski.MaliNOWA.catalog;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateClothingRequest(
        String name,
        String category,
        String description,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        String imageUrl,
        @PositiveOrZero Integer stock,
        String size,
        boolean featured
) {
}
