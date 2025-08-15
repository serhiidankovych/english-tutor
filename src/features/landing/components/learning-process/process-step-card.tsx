import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <Card className={cn("relative border-0 group", color)}>
      <CardHeader className="pb-0 transition-opacity duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary boorder border-1 border-white "></div>
          <span className="text-md f text-white ">{step}</span>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="relative z-10 h-40 -mb-17 transition-opacity duration-300 group-hover:opacity-0">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
        <div
          className="relative z-10 p-6  h-[150px]  rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 group-hover:opacity-0"
          style={{
            clipPath:
              "polygon(0 0, 35% 0, 42% 2rem, 100% 2rem, 100% 100%, 0 100%)",
          }}
        >
          <div className="pt-8 transition-opacity duration-300 group-hover:opacity-0">
            <h2 className="mb-2 text-lg font-bold text-foreground line-clamp-2">
              {title}
            </h2>
          </div>
        </div>
        <div
          className={cn(
            "absolute inset-0 flex p-6 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100",
            color
          )}
        >
          <p className="text-md font-bold  text-white text-justify">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
