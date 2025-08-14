import React from "react";
import Image from "next/image";
import { MapPin, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Experience {
  id: number;
  title: string;
  location: string;
  dates: string;
  description: string;
  category: string;
  imageSrc: string;
  icon: string;
}

interface ExperienceCardProps {
  experience: Experience;
  IconComponent: LucideIcon | undefined;
}

const categoryColors: Record<string, string> = {
  All: "from-slate-500 to-slate-600",
  Education: "from-blue-500 to-blue-600",
  "Study Abroad": "from-green-500 to-green-600",
  Professional: "from-purple-500 to-purple-600",
  Training: "from-orange-500 to-orange-600",
};

export function ExperienceCard({
  experience,
  IconComponent,
}: ExperienceCardProps) {
  const categoryColor =
    categoryColors[experience.category] || "from-gray-500 to-gray-600";

  return (
    <Card className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-xl border-none p-0 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      {experience.imageSrc && (
        <Image
          src={experience.imageSrc}
          alt={experience.title}
          fill
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
      <div className="absolute top-4 right-4 z-20">
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${categoryColor} shadow-lg`}
        >
          {experience.category}
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-2 p-4 text-white">
        <div className="flex items-start gap-2.5">
          {IconComponent && (
            <IconComponent className="h-5 w-5 flex-shrink-0 text-white/90 transition-colors group-hover:text-white mt-0.5" />
          )}
          <h3 className="text-md font-bold leading-tight line-clamp-2">
            {experience.title}
          </h3>
        </div>
        <div className=" space-y-1 text-sm text-neutral-300">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{experience.location}</span>
          </div>
          <div className="text-xs text-neutral-400">
            <span>{experience.dates}</span>
          </div>
        </div>
        {/* <p className=" text-xs leading-relaxed text-neutral-300 line-clamp-3">
          {experience.description}
        </p> */}
      </div>
    </Card>
  );
}
