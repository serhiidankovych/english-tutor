import React from "react";
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  experienceCount: number;
}

const categoryColors: Record<string, string> = {
  All: "bg-gradient-to-r from-slate-500 to-slate-600",
  Education: "bg-gradient-to-r from-blue-500 to-blue-600",
  "Study Abroad": "bg-gradient-to-r from-green-500 to-green-600",
  Professional: "bg-gradient-to-r from-purple-500 to-purple-600",
  Training: "bg-gradient-to-r from-orange-500 to-orange-600",
};

export function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  if (categories.length <= 1) return null;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const colorClass =
            categoryColors[category] ||
            "bg-gradient-to-r from-gray-500 to-gray-600";

          return (
            <Button
              key={category}
              variant={isActive ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={`
                transition-all duration-200 hover:scale-105 relative overflow-hidden
                ${isActive ? `text-white ${colorClass}` : "hover:bg-muted/50"}
              `}
              size="sm"
            >
              {category}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
