import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClothingById } from "../../../lib/api";

type ClothingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClothingDetailPage({ params }: ClothingDetailPageProps) {
  const { id } = await params;
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    notFound();
  }

  let clothing;
  try {
    clothing = await getClothingById(parsedId);
  } catch {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link href="/catalog" className="text-sm font-medium text-rose-800 underline hover:text-rose-700">
        ← Wróć do katalogu
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <article className="overflow-hidden rounded-xl border border-rose-200 bg-white shadow-sm">
          {clothing.imageUrl ? (
            <Image
              src={clothing.imageUrl}
              alt={clothing.name ?? `Produkt ${clothing.id}`}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="aspect-3/4 w-full bg-rose-100" />
          )}
        </article>

        <aside className="rounded-xl border border-rose-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-rose-900">{clothing.name ?? `Produkt #${clothing.id}`}</h1>
            {clothing.category && (
              <span className="rounded-md bg-rose-100 px-2 py-1 text-xs text-rose-800">{clothing.category}</span>
            )}
          </div>

          {clothing.featured && (
            <p className="mt-3 inline-block rounded-md bg-rose-200 px-2 py-1 text-xs font-medium text-rose-900">
              Produkt wyróżniony
            </p>
          )}

          {clothing.description && <p className="mt-4 text-sm leading-6 text-rose-800">{clothing.description}</p>}

          <div className="mt-6 space-y-2 border-t border-rose-100 pt-4">
            <p className="text-2xl font-bold text-rose-800">{clothing.price.toFixed(2)} zł</p>
            {clothing.size && <p className="text-sm text-rose-700">Rozmiar: {clothing.size}</p>}
            {clothing.stock !== null && <p className="text-sm text-rose-700">Dostępna ilość: {clothing.stock}</p>}
          </div>
        </aside>
      </div>
    </section>
  );
}
