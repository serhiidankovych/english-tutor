import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/glass-container";
import { Calendar, Video } from "lucide-react";
import { HeroSkills } from "./hero-skills";
import { TutorProfileCard } from "../sidebar/tutor-profile-card";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <div className="flex flex-col px-2 max-w-7xl mx-auto gap-6">
      <div>
        <div className="block lg:hidden mb-6">
          <TutorProfileCard />
        </div>

        <section className="order-3 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="hidden lg:block w-full mx-auto lg:mx-0">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight flex flex-col break-words">
              {t("mainTitle")}
              <div className="flex flex-wrap items-center gap-2">
                <span>{t("subTitle")}</span>
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-serif italic">
                  {t("tutorName")}
                </span>
              </div>
            </h1>
          </div>
          <p className="hidden lg:block mt-2 text-md sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 break-words">
            {t("description")}
          </p>
        </section>
      </div>

      <div className="order-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <a
          href="https://t.me/vikkktoriia_km"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlassContainer>
            <Button
              size="lg"
              className="border-white/50 border-2 w-full sm:w-auto"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {t("buttons.firstLesson")}
            </Button>
          </GlassContainer>
        </a>

        <Link href="#video-section">
          <GlassContainer>
            <Button
              size="lg"
              className="border-white/50 border-2 w-full sm:w-auto"
              variant="outline"
            >
              <Video className="w-5 h-5 mr-2" />
              {t("buttons.welcomeVideo")}
            </Button>
          </GlassContainer>
        </Link>
      </div>

      <div className="order-4 flex flex-col gap-4 sm:gap-6">
        <h3 className="font-semibold text-foreground text-2xl font-serif">
          {t("skillsTitle")}
        </h3>
        <HeroSkills />
      </div>
    </div>
  );
}
