import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Salford & Co. HealthSaaS",
  description: "Smart health management for smarter work",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}