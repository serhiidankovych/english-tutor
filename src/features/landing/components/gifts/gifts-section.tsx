"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Gift, Download } from "lucide-react";
import { PageSection } from "../common/section-page";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function GiftsSection() {
  const t = useTranslations("GiftsSection");
  const gifts = t.raw("gifts");

  const handleDownload = (downloadUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageSection
      className="py-12 md:py-20"
      title={t("title")}
      description={t("description")}
      icon={<Gift className="h-8 w-8 text-primary" />}
      titleLevel="h2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {gifts.map(
          (
            gift: {
              id: number;
              image: string;
              title: string;
              description: string;
              downloadUrl: string;
              fileType: string;
            },
            index: number
          ) => (
            <Card
              key={gift.id || index}
              className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-xl border-none p-0 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <Image
                src={gift.image}
                alt={gift.title}
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

              <div className="absolute top-4 right-4 z-20">
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-slate-800 font-semibold shadow-md"
                >
                  {gift.fileType}
                </Badge>
              </div>

              <div className="relative z-10 flex flex-col gap-4 p-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold leading-tight text-white line-clamp-2">
                    {gift.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-300 line-clamp-3">
                    {gift.description}
                  </p>
                </div>
                <Button
                  onClick={() => handleDownload(gift.downloadUrl, gift.title)}
                  className="w-full group/btn mt-2"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover/btn:animate-bounce" />
                  {t("downloadButtonText")}
                </Button>
              </div>
            </Card>
          )
        )}
      </div>
    </PageSection>
  );
}
