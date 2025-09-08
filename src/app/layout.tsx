import type { Metadata, Viewport } from "next";
import "./globals.css";
import CanvasBackground from "@/components/CanvasBackground";
import RouteTransition from "@/components/RouteTransition";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Alexandros Nomikos | Portfolio",
  description: "Where digital worlds are shaped",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexandros Nomikos",
    url: "https://axelsweb.netlify.app",
    sameAs: [
      "https://www.linkedin.com/in/alexandros-nomikos",
      "https://github.com/axelsweb",
    ],
    jobTitle: "Frontend Web Developer / Creative Coder",
    worksFor: {
      "@type": "Organization",
      name: "ESOFTHALL LTD.",
    },
    description:
      "Web developer and creative coder shaping digital experiences, interactive 3D visuals, and web apps.",
  };

  return (
    <html lang="en">
      <Head>
        <title>Alexandros Nomikos | Portfolio</title>
        <meta name="description" content="Where digital worlds are shaped" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className="antialiased relative min-h-dvh w-screen overflow-hidden text-[clamp(11px,1.33vw,14px)]">
        <CanvasBackground />
        <div className="absolute inset-0 z-20 pointer-events-auto">
          <RouteTransition>{children}</RouteTransition>
        </div>
      </body>
    </html>
  );
}
