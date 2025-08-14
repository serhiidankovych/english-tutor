import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export function ProcessStepCard({
  step,
  title,
  description,
  image,
  color,
}: ProcessStepCardProps) {
  return (
    <Card
      className="relative border-0 group"
      style={{ backgroundColor: color }}
    >
      <CardHeader className="pb-0 transition-opacity duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary"></div>
          <span className="text-sm font-semibold text-primary">{step}</span>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="relative z-10 h-40 -mb-17 transition-opacity duration-300 group-hover:opacity-0">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
        <div
          className="relative z-10 p-6  h-[150px] rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 group-hover:opacity-0"
          style={{
            clipPath:
              "polygon(0 0, 35% 0, 42% 2rem, 100% 2rem, 100% 100%, 0 100%)",
            border: "1px solid rgba(255, 255, 255, 0.52)",
          }}
        >
          <div className="pt-8 transition-opacity duration-300 group-hover:opacity-0">
            <h2 className="mb-2 text-lg font-bold text-foreground line-clamp-2">
              {title}
            </h2>
          </div>
        </div>
        <div
          className="absolute inset-0 flex p-6 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: color,
          }}
        >
          <p className="text-md leading-relaxed text-foreground text-justify">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
