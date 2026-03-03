"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clothing, getClothes } from "../lib/api";

export default function Home() {
  const [featured, setFeatured] = useState<Clothing[]>([]);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const items = await getClothes();
        setFeatured(items.filter((item) => item.featured).slice(0, 3));
      } catch {
        setFeatured([]);
      }
    }

    void loadFeatured();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="rounded-2xl bg-linear-to-br from-rose-900 via-rose-800 to-pink-700 p-6 text-rose-50 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-100/85">Nowa kolekcja wiosna 2026</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
          Moda lokalnie. Styl, który wyróżnia.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-rose-100 sm:text-base">
          Odkryj najnowsze kroje, wygodne materiały i codzienny look, który przyciąga uwagę.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/catalog" className="rounded-md bg-rose-50 px-5 py-2.5 text-center font-semibold text-rose-900 hover:bg-rose-100">Przejdź do katalogu</Link>
          <Link href="/about" className="rounded-md border border-rose-100/70 px-5 py-2.5 text-center font-semibold text-rose-50 hover:bg-rose-900/30">Poznaj MaliNOWA</Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-rose-900">Wyróżnione produkty</h2>
          <Link href="/catalog" className="text-sm font-medium text-rose-800 underline hover:text-rose-700">Zobacz cały katalog</Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.length === 0 && (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">Produkty pojawią się tutaj po uruchomieniu backendu.</p>
          )}
          {featured.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-rose-200 bg-white shadow-sm">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={1200}
                height={900}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-rose-900">{item.name}</h3>
                <p className="mt-1 text-sm text-rose-700">{item.category}</p>
                <p className="mt-3 text-lg font-bold text-rose-800">{item.price.toFixed(2)} zł</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
