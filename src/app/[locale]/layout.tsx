import type { Metadata } from "next";
import { Inter, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";
import Header from "@/components/header";
import AnnouncementBar from "@/components/announcement-bar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const noto = Noto_Serif_Display({
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viktoriia Kuzmych – Professional English Tutor from Ukraine",
  description:
    "Learn English with Viktoriia – an experienced tutor from Ukraine offering personalized lessons online and in person. Improve grammar, speaking, and confidence with engaging, tailored lessons.",
  keywords: [
    "English tutor",
    "learn English online",
    "English lessons Ukraine",
    "private English classes",
    "online English teacher",
    "IELTS preparation",
    "spoken English",
    "grammar improvement",
    "business English",
  ],
  authors: [{ name: "Viktoriia" }],
  openGraph: {
    title: "Viktoriia – Professional English Tutor from Ukraine",
    description:
      "Learn English with Viktoriia – an experienced tutor from Ukraine offering personalized lessons online and in person.",

    siteName: "Viktoriia English Tutoring",
    images: [
      {
        url: "/about-me.png",
        width: 1200,
        height: 630,
        alt: "Viktoriia – English Tutor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/graduation.png",
    shortcut: "/graduation.png",
    apple: "/graduation.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={` ${inter.variable} ${noto.variable} antialiased `}>
        <NextIntlClientProvider>
          <AnnouncementBar />
          <Header />
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
