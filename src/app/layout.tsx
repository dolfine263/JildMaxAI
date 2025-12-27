import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jildmax.com'),
  title: "JildMax - AI Skin Analysis & Personalized Skincare",
  description: "Get a personalized skincare routine in 30 seconds. Upload a selfie and let our medical-grade AI analyze your skin type, detect issues, and recommend the perfect products.",
  keywords: ["skincare", "AI skin analysis", "personalized routine", "skin type", "NGlow", "Pakistan skincare"],
  authors: [{ name: "JildMax AI" }],
  creator: "JildMax",
  publisher: "NGlow Skincare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jildmax.com",
    siteName: "JildMax",
    title: "JildMax - AI Skin Analysis",
    description: "Get your personalized skincare routine in 30 seconds with AI-powered analysis.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JildMax AI Skin Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JildMax - AI Skin Analysis",
    description: "Get your personalized skincare routine in 30 seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${fredoka.variable} ${nunitoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
