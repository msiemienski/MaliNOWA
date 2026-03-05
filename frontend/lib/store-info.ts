export type StoreInfo = {
  name: string;
  slogan: string;
  description: string;
  address: string;
  openingHours: string;
  highlights: string[];
};

export const storeInfo: StoreInfo = {
  name: "MaliNOWA",
  slogan: "Lokalny styl, który przyciąga spojrzenia.",
  description:
    "MaliNOWA to lokalny butik z modą damską i męską. Stawiamy na wygodne kroje, dobre materiały i przystępne ceny.",
  address: "ul. Wodna 7, 13-300 Nowe Miasto Lubawskie",
  openingHours: "Pon-Pt: 9:00 - 16:00, Sob: 9:00 - 12:00",
  highlights: [
    "Nowe kolekcje co tydzień",
    "Pomoc stylistki na miejscu"
  ],
};
