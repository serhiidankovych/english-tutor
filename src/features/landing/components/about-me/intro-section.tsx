import React from "react";
import Image from "next/image";

export interface IntroData {
  text: string;
  image: string;
  imageAlt: string;
  videoUrl: string;
  videoTitle: string;
}

interface IntroSectionProps {
  introData: IntroData;
}

export function IntroSection({ introData }: IntroSectionProps) {
  if (!introData.text && !introData.image) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start mb-8">
      <div className="flex-1">
        <div className="relative bg-muted text-muted-foreground px-4 py-3 rounded-2xl shadow-md inline-block max-w-lg">
          <p className="text-lg leading-relaxed">{introData.text}</p>

          <div className="absolute bottom-0 right-4 translate-y-full w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-muted border-r-8 border-r-transparent"></div>
        </div>
      </div>

      {introData.image && (
        <div className="flex-shrink-0">
          <Image
            src={introData.image}
            alt={introData.imageAlt || "Profile picture"}
            width={300}
            height={300}
            priority
          />
        </div>
      )}
    </div>
  );
}
