"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { SkillCard, SkillCardProps } from "./skill-card";

export function HeroStats() {
  const t = useTranslations("HeroStats");
  const statsData = t.raw("stats");

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {statsData.map((stat: SkillCardProps, index: number) => {
        return (
          <SkillCard
            key={stat.value || index}
            value={stat.value}
            highlight={stat.highlight}
            image={stat.image}
          />
        );
      })}
    </section>
  );
}
