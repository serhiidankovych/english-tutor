"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string;
  className?: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  description,
  className,
  titleLevel = "h1",
  children,
}) => {
  const TitleTag = titleLevel;

  return (
    <div className={cn("text-left", className)}>
      <div className="flex items-center justify-start mb-4">
        {/* {icon && (
          <div className="p-3 bg-primary/10 rounded-full mr-4">{icon}</div>
        )} */}
        {title ? (
          typeof title === "string" ? (
            <TitleTag className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {title}
            </TitleTag>
          ) : (
            <div className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {title}
            </div>
          )
        ) : (
          children
        )}
      </div>
      {description && (
        <p className="text-xl text-muted-foreground max-w-2xl ">
          {description}
        </p>
      )}
    </div>
  );
};
