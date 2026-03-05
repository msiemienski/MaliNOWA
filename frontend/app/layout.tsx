import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { storeInfo } from "../lib/store-info";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaliNOWA | Butik odzieżowy",
  description: "Nowoczesny butik odzieżowy z katalogiem online i panelem admina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background text-foreground">
          <header className="sticky top-0 z-10 border-b border-rose-200 bg-rose-50/95 backdrop-blur">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" aria-label="MaliNOWA - strona główna" className="shrink-0">
                <Image
                  src="/logo_Malinowa.svg"
                  alt="MaliNOWA"
                  width={170}
                  height={44}
                  priority
                  className="h-9 w-auto sm:h-11"
                />
              </Link>
              <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
                <Link href="/catalog" className="text-rose-900 hover:text-rose-700 hover:underline">Katalog</Link>
                <Link href="/about" className="text-rose-900 hover:text-rose-700 hover:underline">O sklepie</Link>
                <Link href="/admin" className="rounded-md bg-rose-700 px-3 py-1.5 text-rose-50 hover:bg-rose-800">Admin</Link>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-12 border-t border-rose-200 bg-rose-50">
            <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6">
              <section>
                <h2 className="text-base font-semibold text-rose-900">{storeInfo.name}</h2>
                <p className="mt-2 text-sm text-rose-800">{storeInfo.slogan}</p>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-900">Nawigacja</h3>
                <ul className="mt-3 space-y-2 text-sm text-rose-800">
                  <li><Link href="/" className="hover:underline">Strona główna</Link></li>
                  <li><Link href="/catalog" className="hover:underline">Katalog</Link></li>
                  <li><Link href="/about" className="hover:underline">O sklepie</Link></li>
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-900">Informacje</h3>
                <p className="mt-3 text-sm text-rose-800">{storeInfo.address}</p>
                <p className="mt-2 text-sm text-rose-800">Godziny: {storeInfo.openingHours}</p>
              </section>
            </div>

            <div className="border-t border-rose-200">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-xs text-rose-700 sm:px-6">
                <p>© {currentYear} {storeInfo.name}. Wszelkie prawa zastrzeżone.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
