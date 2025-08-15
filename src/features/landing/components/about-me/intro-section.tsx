import React from "react";
import Image from "next/image";

export interface IntroData {
  text: string;
  image: string;
  imageAlt: string;
  videoUrl?: string;
  videoTitle?: string;
}

interface IntroSectionProps {
  introData: IntroData;
}

export function IntroSection({ introData }: IntroSectionProps) {
  if (!introData.text && !introData.image) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start mb-12">
      <div className="flex-1 relative">
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative max-w-lg">
          <p className="text-lg md:text-xl leading-relaxed">{introData.text}</p>
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white dark:border-t-gray-800 border-r-8 border-r-transparent"></div>
        </div>
      </div>

      {introData.image && (
        <div className="flex-shrink-0">
          <Image
            src={introData.image}
            alt={introData.imageAlt || "Profile picture"}
            width={350}
            height={350}
            priority
          />
        </div>
      )}
    </div>
  );
}
