import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
        </div>
      </body>
    </html>
  );
}
