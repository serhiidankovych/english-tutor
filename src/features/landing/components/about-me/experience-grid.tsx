import React from "react";
import { BookOpen } from "lucide-react";
import { Experience, ExperienceCard } from "./experience-card";
import { iconMap } from "../../utils/about-me";

interface ExperienceGridProps {
  experiences: Experience[];
  noItemsTitle?: string;
  noItemsMessage?: string;
}

export function ExperienceGrid({
  experiences,
  noItemsTitle = "No experiences found",
  noItemsMessage = "Try selecting a different category to see more experiences.",
}: ExperienceGridProps) {
  if (experiences.length === 0) {
    return (
      <div className="mt-12 text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <h4 className="text-lg font-semibold mb-2">{noItemsTitle}</h4>
        <p className="text-muted-foreground max-w-md mx-auto">
          {noItemsMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="md:hidden overflow-x-auto">
        <div className="flex gap-6 pb-4 min-w-max">
          {experiences.map((experience) => {
            const IconComponent = iconMap[experience.icon];
            return (
              <div key={experience.id} className="flex-shrink-0 w-80">
                <ExperienceCard
                  experience={experience}
                  IconComponent={IconComponent}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => {
          const IconComponent = iconMap[experience.icon];
          return (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              IconComponent={IconComponent}
            />
          );
        })}
      </div>
    </div>
  );
}
