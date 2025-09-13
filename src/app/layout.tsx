import type { Metadata, Viewport } from "next";
import "./globals.css";
import CanvasBackground from "@/components/CanvasBackground";
import RouteTransition from "@/components/RouteTransition";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UIChromeController from "@/components/UIChromeController";

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
        {/* UI toggle lives outside of chrome so it remains available when UI is hidden */}
        <UIChromeController />
        <div className="ui-chrome h-full flex flex-col">
          <Header />
          {/* Make content region positioning context for RouteTransition */}
          <div className="pointer-events-auto flex-1 min-h-0 relative">
            <RouteTransition>
              <main id="main" role="main" className="w-full h-full overscroll-contain">
                {children}
              </main>
            </RouteTransition>
          </div>
          <Footer />
          {/* Move skip link inside chrome so it hides with UI */}
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-black/70 focus:text-white focus:px-3 focus:py-2 focus:rounded-md">Skip to content</a>
        </div>
      </body>
    </html>
  );
}


