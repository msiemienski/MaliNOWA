package com.github.msiemienski.MaliNOWA.catalog;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ClothingRepository clothingRepository;

    @Override
    public void run(String... args) {
        if (clothingRepository.count() > 0) {
            return;
        }

        List<Clothing> clothes = List.of(
                create("Lniana Koszula", "Koszule", "Przewiewna lniana koszula idealna na cieplejsze dni.", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80", new BigDecimal("169.99"), 15, true),
                create("Jeansy Slim", "Spodnie", "Klasyczne jeansy slim z elastycznym materiałem.", "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80", new BigDecimal("199.99"), 20, true),
                create("Bluza Oversize", "Bluzy", "Miękka bluza o luźnym kroju, idealna na co dzień.", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80", new BigDecimal("149.99"), 12, false),
                create("Sukienka Midi", "Sukienki", "Kobieca sukienka midi z delikatnym wzorem.", "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80", new BigDecimal("249.99"), 8, true),
                create("Kurtka Przejściowa", "Kurtki", "Lekka kurtka na wiosnę i jesień.", "https://images.unsplash.com/photo-1484516758160-69878111a911?auto=format&fit=crop&w=1200&q=80", new BigDecimal("329.99"), 6, false)
        );

        clothingRepository.saveAll(clothes);
    }

    private Clothing create(String name, String category, String description, String imageUrl, BigDecimal price, int stock, boolean featured) {
        Clothing clothing = new Clothing();
        clothing.setName(name);
        clothing.setCategory(category);
        clothing.setDescription(description);
        clothing.setImageUrl(imageUrl);
        clothing.setPrice(price);
        clothing.setStock(stock);
        clothing.setFeatured(featured);
        return clothing;
    }
}
