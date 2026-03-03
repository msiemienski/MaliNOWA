package com.github.msiemienski.MaliNOWA.catalog;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record CreateClothingRequest(
        @NotBlank String name,
        @NotBlank String category,
        @NotBlank String description,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @NotBlank String imageUrl,
        @PositiveOrZero Integer stock,
        boolean featured
) {
}
