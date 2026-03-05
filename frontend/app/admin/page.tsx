"use client";

import { FormEvent, useState } from "react";
import { createClothing } from "../../lib/api";

type FormState = {
  name: string;
  category: string;
  description: string;
  price: string;
  imageUrl: string;
  stock: string;
  featured: boolean;
};

const initialState: FormState = {
  name: "",
  category: "",
  description: "",
  price: "",
  imageUrl: "",
  stock: "",
  featured: false,
};

export default function AdminPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      await createClothing({
        price: Number(form.price),
        name: form.name.trim() || undefined,
        category: form.category.trim() || undefined,
        description: form.description.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        stock: form.stock.trim() ? Number(form.stock) : undefined,
        featured: form.featured,
      });

      setMessage("Produkt został dodany.");
      setForm(initialState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Nie udało się zapisać produktu.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-rose-900">Panel admina</h1>
      <p className="mt-2 text-sm text-rose-700">Dodaj nowe ubranie, które pojawi się w katalogu.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-rose-200 bg-white p-5 shadow-sm">
        <input
          className="w-full rounded-md border border-rose-200 px-3 py-2"
          placeholder="Nazwa (opcjonalnie)"
          value={form.name}
          onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
        />
        <input
          className="w-full rounded-md border border-rose-200 px-3 py-2"
          placeholder="Kategoria (opcjonalnie)"
          value={form.category}
          onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
        />
        <textarea
          className="min-h-24 w-full rounded-md border border-rose-200 px-3 py-2"
          placeholder="Opis (opcjonalnie)"
          value={form.description}
          onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-rose-200 px-3 py-2"
            placeholder="Cena (wymagane)"
            value={form.price}
            onChange={(e) => setForm((current) => ({ ...current, price: e.target.value }))}
          />
          <input
            type="number"
            min="0"
            className="w-full rounded-md border border-rose-200 px-3 py-2"
            placeholder="Stan magazynowy (opcjonalnie)"
            value={form.stock}
            onChange={(e) => setForm((current) => ({ ...current, stock: e.target.value }))}
          />
        </div>
        <input
          className="w-full rounded-md border border-rose-200 px-3 py-2"
          placeholder="URL zdjęcia (opcjonalnie)"
          value={form.imageUrl}
          onChange={(e) => setForm((current) => ({ ...current, imageUrl: e.target.value }))}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((current) => ({ ...current, featured: e.target.checked }))}
          />
          Oznacz jako wyróżnione
        </label>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-md bg-rose-700 px-4 py-2 font-semibold text-rose-50 hover:bg-rose-800 disabled:opacity-60"
        >
          {saving ? "Zapisywanie..." : "Dodaj produkt"}
        </button>

        {message && <p className="rounded-md bg-rose-100 p-3 text-sm text-rose-700">{message}</p>}
        {error && <p className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      </form>
    </section>
  );
}
