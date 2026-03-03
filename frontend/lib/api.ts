export type Clothing = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  featured: boolean;
};

export type StoreInfo = {
  name: string;
  slogan: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  highlights: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getClothes(): Promise<Clothing[]> {
  const response = await fetch(`${API_BASE_URL}/api/clothes`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Nie udało się pobrać katalogu ubrań.");
  }

  return response.json();
}

export async function createClothing(payload: Omit<Clothing, "id">): Promise<Clothing> {
  const response = await fetch(`${API_BASE_URL}/api/clothes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Nie udało się dodać produktu.");
  }

  return response.json();
}

export async function getStoreInfo(): Promise<StoreInfo> {
  const response = await fetch(`${API_BASE_URL}/api/store/info`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Nie udało się pobrać informacji o sklepie.");
  }

  return response.json();
}
