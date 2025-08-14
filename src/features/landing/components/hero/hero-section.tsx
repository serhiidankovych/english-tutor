import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/glass-container";
import { Calendar, Video } from "lucide-react";
import { HeroStats } from "./hero-stats";
import { LettersPullUp } from "@/components/text-up";
import { TutorProfileCard } from "../sidebar/tutor-profile-card";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <div className="flex flex-col gap-12">
      <div className="order-1 lg:hidden">
        <TutorProfileCard />
      </div>

      <section className="order-3 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight flex flex-col items-start gap-2">
            <LettersPullUp text={t("mainTitle")} />
            <div className="flex items-center gap-2">
              <span className="transition-opacity">{t("subTitle")}</span>
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-serif italic">
                {t("tutorName")}
              </span>
            </div>
          </h1>
        </div>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
          {t("description")}
        </p>
      </section>

      <div className="order-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <a
          href="https://t.me/vikkktoriia_km"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlassContainer>
            <Button size="lg" className="border-white/50 border-2">
              <Calendar className="w-5 h-5 mr-2" />
              {t("buttons.firstLesson")}
            </Button>
          </GlassContainer>
        </a>

        <Link href="#video-section">
          <GlassContainer>
            <Button
              size="lg"
              className="border-white/50 border-2"
              variant="outline"
            >
              <Video className="w-5 h-5 mr-2" />
              {t("buttons.welcomeVideo")}
            </Button>
          </GlassContainer>
        </Link>
      </div>

      <div className="order-4 flex flex-col gap-4">
        <h3 className="font-semibold text-foreground text-2xl font-serif">
          {t("skillsTitle")}
        </h3>
        <HeroStats />
      </div>
    </div>
  );
}
