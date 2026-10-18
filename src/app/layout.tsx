import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hax.baby"),
  title: "Pip the Skull Baby · Junior Dream Engineer | Baby's First Portfolio",
  description:
    "Official portfolio for Pip, the sleepy skull baby who crafts sweet dreams, music boxes, and glowing nightlights at Midnight Nursery. Built for the haX.baby hackathon.",
  keywords: [
    "haX.baby",
    "Baby's First Website",
    "Pip the Skull Baby",
    "Junior Dream Engineer",
    "Creative Portfolio",
    "Early Web",
  ],
  authors: [{ name: "Pip & Co-Dreamers" }],
  openGraph: {
    title: "Pip the Skull Baby · Junior Dream Engineer",
    description: "I build the dreams you fall asleep inside at Midnight Nursery.",
    url: "https://hax.baby/baby-problem",
    siteName: "haX.baby Hackathon Portfolio",
    images: [
      {
        url: "/assets/pip_avatar_cloud.png",
        width: 1200,
        height: 630,
        alt: "Pip the Skull Baby on a sleepy cloud",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/pip_dream_lantern.png" />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-[#a34063] selection:text-white dark:selection:bg-[#ff7597] dark:selection:text-black">
        {children}
      </body>
    </html>
  );
}
