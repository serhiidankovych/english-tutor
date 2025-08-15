"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { SkillCard, SkillCardProps } from "./skill-card";

export function HeroSkills() {
  const t = useTranslations("HeroStats");
  const statsData = t.raw("stats");

  return (
    <section className="w-full">
      <div className="sm:hidden overflow-x-auto">
        <div className="flex gap-4 pb-4 min-w-max">
          {statsData.map((stat: SkillCardProps, index: number) => {
            return (
              <div key={stat.value || index} className="flex-shrink-0 w-80">
                <SkillCard
                  value={stat.value}
                  highlight={stat.highlight}
                  image={stat.image}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 gap-4 md:gap-6">
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
      </div>
    </section>
  );
}
