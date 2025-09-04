import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexandros Nomikos | Portfolio",
  description: "Where digital worlds are shaped",
};

// ✅ Add viewport config
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // for iOS safe area handling
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased w-screen h-screen overflow-hidden text-[clamp(11px,1.33vw,14px)]">
        {children}
      </body>
    </html>
  );
}
