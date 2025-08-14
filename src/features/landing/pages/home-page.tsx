import React from "react";
import { HeroSection } from "../components/hero/hero-section";
import { LearningProcessSection } from "../components/learning-process/learning-process-section";
import { TutorProfileCard } from "../components/sidebar/tutor-profile-card";
import { AboutMeSection } from "../components/about-me/about-me-section";
import { TestSection } from "../components/test/test-section";
import { GiftsSection } from "../components/gifts/gifts-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4 py-4 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <main className="space-y-8 md:space-y-12 lg:col-span-2">
            <HeroSection />
            <LearningProcessSection />
            <AboutMeSection />
            <TestSection />
            <GiftsSection />
          </main>

          <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-fit space-y-8">
            <TutorProfileCard />
          </aside>
        </div>
      </div>
    </div>
  );
}
