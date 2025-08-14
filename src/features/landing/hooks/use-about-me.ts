import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Experience } from "../components/about-me/experience-card";
import { IntroData } from "../components/about-me/intro-section";
import { calculatePagination, filterExperiences } from "../utils/about-me";

const ITEMS_PER_PAGE = 3;

export function useAboutMe() {
  const t = useTranslations("AboutMe");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const experiences: Experience[] = useMemo(() => {
    try {
      return t.raw("experiences") as Experience[];
    } catch {
      return [];
    }
  }, [t]);

  const categories: string[] = useMemo(() => {
    try {
      return t.raw("categories") as string[];
    } catch {
      return ["All"];
    }
  }, [t]);

  const introData: IntroData = useMemo(() => {
    try {
      return t.raw("intro") as IntroData;
    } catch {
      return {
        text: "",
        image: "/default-avatar.jpg",
        imageAlt: "Profile",
        videoUrl: "",
        videoTitle: "Introduction Video",
      };
    }
  }, [t]);

  const filteredExperiences = useMemo(() => {
    return filterExperiences(experiences, activeCategory);
  }, [experiences, activeCategory]);

  const pagination = useMemo(() => {
    return calculatePagination(
      filteredExperiences.length,
      ITEMS_PER_PAGE,
      currentPage
    );
  }, [filteredExperiences.length, currentPage]);

  const currentExperiences = useMemo(() => {
    return filteredExperiences.slice(
      pagination.startIndex,
      pagination.endIndex
    );
  }, [filteredExperiences, pagination.startIndex, pagination.endIndex]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);

      document.querySelector('[data-section="about-me"]')?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setCurrentPage(1);
    }
  };

  return {
    experiences,
    categories,
    introData,
    filteredExperiences,
    currentExperiences,

    currentPage,
    activeCategory,
    totalPages: pagination.totalPages,

    handlePageChange,
    handleCategoryChange,

    t,
  };
}
