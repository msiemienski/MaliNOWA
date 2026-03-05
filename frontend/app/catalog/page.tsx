"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clothing, getClothes } from "../../lib/api";

export default function CatalogPage() {
  const [items, setItems] = useState<Clothing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);

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

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category).filter((value): value is string => Boolean(value)))].sort(),
    [items],
  );

  const sizes = useMemo(
    () => [...new Set(items.map((item) => item.size).filter((value): value is string => Boolean(value)))].sort(),
    [items],
  );

  const filteredItems = useMemo(() => {
    const parsedMaxPrice = maxPriceFilter.trim() ? Number(maxPriceFilter) : null;

    return items.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }

      if (sizeFilter !== "all" && item.size !== sizeFilter) {
        return false;
      }

      if (featuredOnly && !item.featured) {
        return false;
      }

      if (parsedMaxPrice !== null && Number.isFinite(parsedMaxPrice) && item.price > parsedMaxPrice) {
        return false;
      }

      return true;
    });
  }, [items, categoryFilter, sizeFilter, featuredOnly, maxPriceFilter]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-rose-900">Katalog ubrań</h1>
      <p className="mt-2 text-sm text-rose-700">Przeglądaj aktualną kolekcję MaliNOWA.</p>

      {!loading && !error && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-md border border-rose-200 px-3 py-2 text-sm"
            >
              <option value="all">Wszystkie kategorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sizeFilter}
              onChange={(event) => setSizeFilter(event.target.value)}
              className="rounded-md border border-rose-200 px-3 py-2 text-sm"
            >
              <option value="all">Wszystkie rozmiary</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <input
              type="number"
              min="0"
              step="0.01"
              value={maxPriceFilter}
              onChange={(event) => setMaxPriceFilter(event.target.value)}
              placeholder="Cena maksymalna"
              className="rounded-md border border-rose-200 px-3 py-2 text-sm"
            />

            <label className="flex items-center gap-2 rounded-md border border-rose-200 px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(event) => setFeaturedOnly(event.target.checked)}
              />
              Tylko wyróżnione
            </label>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-rose-700">
            <p>Wyniki: {filteredItems.length}</p>
            <button
              type="button"
              onClick={() => {
                setCategoryFilter("all");
                setSizeFilter("all");
                setMaxPriceFilter("");
                setFeaturedOnly(false);
              }}
              className="font-medium text-rose-800 underline hover:text-rose-700"
            >
              Wyczyść filtry
            </button>
          </div>
        </div>
      )}

      {loading && <p className="mt-6">Ładowanie katalogu...</p>}
      {error && <p className="mt-6 rounded-md bg-rose-100 p-3 text-sm text-rose-700">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/catalog/${item.id}`}
              className="group overflow-hidden rounded-xl border border-rose-200 bg-white shadow-sm transition hover:border-rose-300 hover:shadow-md"
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name ?? `Produkt ${item.id}`}
                  width={1200}
                  height={900}
                  className="aspect-3/4 w-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="aspect-3/4 w-full bg-rose-100" />
              )}
              <div className="p-4">
                <p className="text-xl font-bold text-rose-800">{item.price.toFixed(2)} zł</p>
              </div>
            </Link>
          ))}

          {filteredItems.length === 0 && (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              Brak produktów spełniających wybrane filtry.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
