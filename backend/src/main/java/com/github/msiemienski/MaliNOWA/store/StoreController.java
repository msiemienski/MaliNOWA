package com.github.msiemienski.MaliNOWA.store;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/store")
public class StoreController {

    @GetMapping("/info")
    public StoreInfoResponse getStoreInfo() {
        return new StoreInfoResponse(
                "MaliNOWA",
                "Lokalny styl, który przyciąga spojrzenia.",
                "MaliNOWA to lokalny butik z modą damską i męską. Stawiamy na wygodne kroje, dobre materiały i przystępne ceny.",
                "ul. Modna 12, 00-001 Warszawa",
                "+48 500 600 700",
                "kontakt@malinowa.pl",
                "Pon-Pt: 10:00 - 19:00, Sob: 10:00 - 16:00",
                List.of(
                        "Nowe kolekcje co tydzień",
                        "Pomoc stylistki na miejscu",
                        "Rabaty dla stałych klientów"
                )
        );
    }
}
