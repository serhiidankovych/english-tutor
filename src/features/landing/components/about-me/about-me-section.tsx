"use client";
import React from "react";
import { GraduationCap } from "lucide-react";
import { PageSection } from "../common/section-page";
import { useAboutMe } from "../../hooks/use-about-me";
import { CategoryFilters } from "./category-filters";
import { ExperienceGrid } from "./experience-grid";
import { IntroSection } from "./intro-section";
import { VideoSection } from "./video-section";
import { CustomPagination } from "./custom-pagination";

export function AboutMeSection() {
  const {
    introData,
    categories,
    filteredExperiences,
    currentExperiences,
    currentPage,
    activeCategory,
    totalPages,
    handlePageChange,
    handleCategoryChange,
    t,
  } = useAboutMe();

  return (
    <PageSection
      className="py-12 md:py-20"
      title={t("title")}
      description={t("description")}
      icon={<GraduationCap className="h-8 w-8 text-primary" />}
      titleLevel="h2"
      data-section="about-me"
    >
      <IntroSection introData={introData} />

      <VideoSection
        videoUrl={introData.videoUrl}
        videoTitle={introData.videoTitle}
      />

      <div className="mb-12 text-center">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
          {t("journeyTitle")}
        </h3>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t("journeyDescription")}
        </p>
      </div>

      <CategoryFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        experienceCount={filteredExperiences.length}
      />

      <ExperienceGrid
        experiences={currentExperiences}
        noItemsTitle={t("noItemsTitle")}
        noItemsMessage={t("noItemsMessage")}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageSection>
  );
}
