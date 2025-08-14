"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Gift } from "lucide-react";
import { Button } from "./ui/button";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo("/")}
          >
            <Image src="/girls.png" alt={t("logoAlt")} width={60} height={60} />
            <div>
              <h1 className="text-xl font-bold">{t("name")}</h1>
              <p className="text-sm text-muted-foreground">{t("title")}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              onClick={() => navigateTo("/about")}
              variant="link"
              className="relative hidden"
            >
              {t("navigation.freeGift")}
              <span className="absolute -top-1 -right-1 bg-card rounded-full p-1 rotate-25 animate-bounce">
                <Gift className="h-4 w-4" />
              </span>
            </Button>

            <Button onClick={() => navigateTo("/test")} variant="link">
              {t("navigation.takeTest")}
            </Button>

            <LanguageSwitcher />

            <Button onClick={() => navigateTo("/contact")}>
              {t("navigation.bookLesson")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
