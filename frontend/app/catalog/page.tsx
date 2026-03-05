"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clothing, getClothes } from "../../lib/api";

export default function CatalogPage() {
  const [items, setItems] = useState<Clothing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await getClothes();
        setItems(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Wystąpił błąd.");
      } finally {
        setLoading(false);
      }
    }

    void loadCatalog();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-rose-900">Katalog ubrań</h1>
      <p className="mt-2 text-sm text-rose-700">Przeglądaj aktualną kolekcję MaliNOWA.</p>

      {loading && <p className="mt-6">Ładowanie katalogu...</p>}
      {error && <p className="mt-6 rounded-md bg-rose-100 p-3 text-sm text-rose-700">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/catalog/${item.id}`}
              className="group overflow-hidden rounded-xl border border-rose-200 bg-white shadow-sm transition hover:border-rose-300 hover:shadow-md"
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={1200}
                height={900}
                className="aspect-3/4 w-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <span className="rounded-md bg-rose-100 px-2 py-1 text-xs text-rose-800">{item.category}</span>
                </div>
                <p className="text-sm text-rose-700">{item.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-bold text-rose-800">{item.price.toFixed(2)} zł</p>
                  <p className="text-xs text-rose-700">Stan: {item.stock}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
