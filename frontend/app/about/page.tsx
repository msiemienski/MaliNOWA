import { storeInfo } from "../../lib/store-info";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-rose-900">O sklepie</h1>

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
          <h3 className="text-lg font-semibold text-rose-900">Info</h3>
          <p className="mt-3 text-sm">{storeInfo.address}</p>
          <p className="mt-4 text-sm font-medium">Godziny otwarcia</p>
          <p className="mt-1 text-sm">{storeInfo.openingHours}</p>
        </aside>
      </div>
    </section>
  );
}
