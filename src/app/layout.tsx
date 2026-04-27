import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoQuotation | Precision CNC Quoting",
  description: "Automated quotation generator for CNC-machined 3D models.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
