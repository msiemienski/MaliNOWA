package com.github.msiemienski.MaliNOWA.store;

import java.util.List;

public record StoreInfoResponse(
        String name,
        String slogan,
        String description,
        String address,
        String phone,
        String email,
        String openingHours,
        List<String> highlights
) {
}
