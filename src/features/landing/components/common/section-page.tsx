import React from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../common/section-header";

interface PageSectionProps {
  children: React.ReactNode;

  title?: string | React.ReactNode;

  description?: string;

  icon?: React.ReactNode;

  className?: string;

  id?: string;

  as?: React.ElementType;

  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  title,
  description,
  icon,
  className,
  id,
  titleLevel = "h2",
  as: Component = "section",
}) => {
  const hasHeader = title || description || icon;

  return (
    <Component id={id} className={className}>
      <div className="container mx-auto px-4">
        {hasHeader && (
          <div className="text-center mb-8">
            <SectionHeader
              icon={icon}
              description={description}
              title={title}
              titleLevel={titleLevel}
            />
          </div>
        )}
        {children}
      </div>
    </Component>
  );
};
