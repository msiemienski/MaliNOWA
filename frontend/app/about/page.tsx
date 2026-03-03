"use client";

import { useEffect, useState } from "react";
import { StoreInfo, getStoreInfo } from "../../lib/api";

export default function AboutPage() {
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStoreInfo() {
      try {
        const data = await getStoreInfo();
        setStoreInfo(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Wystąpił błąd.");
      }
    }

    void loadStoreInfo();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-rose-900">O sklepie</h1>
      {error && <p className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      {!storeInfo && !error && <p className="mt-4">Ładowanie informacji...</p>}

      {storeInfo && (
        <div className="mt-8 grid gap-6 md:grid-cols-[2fr_1fr]">
          <article className="rounded-xl border border-rose-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-rose-900">{storeInfo.name}</h2>
            <p className="mt-2 font-medium text-rose-700">{storeInfo.slogan}</p>
            <p className="mt-4 text-sm leading-6 text-rose-800">{storeInfo.description}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {storeInfo.highlights.map((item) => (
                <li key={item} className="rounded-md bg-rose-100 px-3 py-2 text-rose-800">{item}</li>
              ))}
            </ul>
          </article>

          <aside className="rounded-xl border border-rose-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-rose-900">Kontakt</h3>
            <p className="mt-3 text-sm">{storeInfo.address}</p>
            <p className="mt-2 text-sm">Tel: {storeInfo.phone}</p>
            <p className="mt-2 text-sm">Email: {storeInfo.email}</p>
            <p className="mt-4 text-sm font-medium">Godziny otwarcia</p>
            <p className="mt-1 text-sm">{storeInfo.openingHours}</p>
          </aside>
        </div>
      )}
    </section>
  );
}
