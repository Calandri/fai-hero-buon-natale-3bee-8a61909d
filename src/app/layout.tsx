import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Il tuo progetto sta nascendo",
  description: "La tua immaginazione sta prendendo forma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">{children}</body>
    </html>
  );
}
