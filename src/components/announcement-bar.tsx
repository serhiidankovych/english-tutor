"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AnnouncementBar() {
  const t = useTranslations("AnnouncementBar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageSwitch = () => {
    const newLocale = locale === "en" ? "uk" : "en";
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  if (locale === "uk") return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center gap-x-4 p-2 text-center text-sm">
        <p>
          <span className="hidden sm:inline text-lg">👀</span> {t("message")}
        </p>
        <Button variant="secondary" size="sm" onClick={handleLanguageSwitch}>
          {t("buttonText")}
        </Button>
      </div>
    </div>
  );
}
