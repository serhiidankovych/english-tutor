"use client";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Gift, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      key: "freeGift",
      label: t("navigation.freeGift"),
      path: "/about",
      icon: <Gift className="h-4 w-4" />,
      isSpecial: true,
      isHidden: true,
    },
    {
      key: "takeTest",
      label: t("navigation.takeTest"),
      path: "/test",
      icon: null,
      isSpecial: false,
      isHidden: false,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 shadow-sm"
          : "border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div
            className="flex items-center gap-3 cursor-pointer group transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => navigateTo("/")}
          >
            <div className="relative">
              <Image
                src="/girls.png"
                alt={t("logoAlt")}
                priority
                width={45}
                height={45}
                className="sm:w-[50px] sm:h-[50px] rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-200"
              />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {t("name")}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-serif leading-tight">
                {t("title")}
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navigationItems.map(
              (item) =>
                !item.isHidden && (
                  <Button
                    key={item.key}
                    onClick={() => navigateTo(item.path)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                      item.isSpecial &&
                        "bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                    {item.isSpecial && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1 rotate-12 animate-bounce">
                        <Gift className="h-3 w-3" />
                      </span>
                    )}
                  </Button>
                )
            )}

            <Separator orientation="vertical" className="mx-3 h-6" />

            <LanguageSwitcher />

            <a
              href="https://t.me/vikkktoriia_km"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                {t("navigation.bookLesson")}
              </Button>
            </a>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 gap-2 hover:bg-accent hover:text-accent-foreground border-border/60"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Menu</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-[280px] sm:w-[320px] p-2 animate-in slide-in-from-top-2"
              >
                <DropdownMenuLabel className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/girls.png"
                      alt={t("logoAlt")}
                      priority
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-primary/20"
                    />
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {t("name")}
                      </div>
                      <div className="text-xs text-muted-foreground font-serif">
                        {t("title")}
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {navigationItems.map(
                  (item) =>
                    !item.isHidden && (
                      <DropdownMenuItem
                        key={item.key}
                        onClick={() => navigateTo(item.path)}
                        className="px-2 py-3 cursor-pointer focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-3 w-full">
                          {item.icon && (
                            <div className="flex-shrink-0">{item.icon}</div>
                          )}
                          <span className="text-sm font-medium flex-1">
                            {item.label}
                          </span>
                          {item.isSpecial && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </DropdownMenuItem>
                    )
                )}

                <div className="sm:hidden">
                  <DropdownMenuSeparator />
                  <div className="px-2 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {t("language")}
                      </span>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="p-2">
                  <a
                    href="https://t.me/vikkktoriia_km"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-200"
                      size="default"
                    >
                      <span className="font-medium text-sm">
                        {t("navigation.bookLesson")}
                      </span>
                    </Button>
                  </a>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
