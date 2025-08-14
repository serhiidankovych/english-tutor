"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const onSelectChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.startsWith(`/${locale}`)
      ? pathname.slice(`/${locale}`.length)
      : pathname;
    const newPath = pathWithoutLocale.startsWith("/")
      ? pathWithoutLocale
      : `/${pathWithoutLocale}`;

    router.push(`/${newLocale}${newPath || "/"}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon" aria-label="Change language">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuRadioGroup value={locale} onValueChange={onSelectChange}>
          <DropdownMenuRadioItem value="en">
            <span className="mr-2">🇺🇸</span> English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="uk">
            <span className="mr-2">🇺🇦</span> Українська
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
