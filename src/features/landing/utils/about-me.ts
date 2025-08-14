import {
  GraduationCap,
  MapPin,
  University,
  Plane,
  BookOpen,
  Briefcase,
  Presentation,
  LucideIcon,
} from "lucide-react";
import { Experience } from "../components/about-me/experience-card";

export const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  MapPin,
  University,
  Plane,
  BookOpen,
  Briefcase,
  Presentation,
} as const;

export const filterExperiences = (
  experiences: Experience[],
  activeCategory: string
) => {
  const allCategories = ["All", "Усе"];

  if (allCategories.includes(activeCategory)) {
    return experiences;
  }

  return experiences.filter((exp) => exp.category === activeCategory);
};

export const calculatePagination = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    totalPages,
    startIndex,
    endIndex,
  };
};
