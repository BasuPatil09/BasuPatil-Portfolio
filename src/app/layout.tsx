import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Basu Patil | AI/ML Portfolio",
  description:
    "Portfolio of Basu Patil — CS & AI/ML engineer in the making. Systems that learn fast, code that ships. Computer vision, NLP, and agentic pipelines, built end to end.",
  keywords: [
    "Basu Patil",
    "Basanagoud Patil",
    "AI/ML Engineer",
    "Machine Learning",
    "Computer Vision",
    "Portfolio",
    "Belagavi",
    "India",
  ],
  authors: [{ name: "Basu Patil" }],
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL("https://basupatil.dev"),
  openGraph: {
    title: "Basu Patil | AI/ML Portfolio",
    description:
      "Systems that learn fast, code that ships — computer vision, NLP, and agentic pipelines built end to end.",
    url: "https://basupatil.dev",
    siteName: "Basu Patil — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basu Patil | AI/ML Portfolio",
    description:
      "Systems that learn fast, code that ships — computer vision, NLP, and agentic pipelines built end to end.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
