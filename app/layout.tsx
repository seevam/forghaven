import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forgehaven Brewing Co.",
  description: "Small-batch ales and lagers brewed with old-world patience, local grain, and obsessive craft.",
  openGraph: {
    title: "Forgehaven Brewing Co.",
    description: "Where craft meets character. Oregon's premier artisan brewery.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
