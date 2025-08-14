import {
  heroStatsData,
  learningProcessSteps,
  tutorProfileData,
  testimonialData,
  englishFor,
} from "../constants/landing-data";

export const useLandingData = () => {
  return {
    heroStats: heroStatsData,
    processSteps: learningProcessSteps,
    tutorProfile: tutorProfileData,
    testimonial: testimonialData,
    englishFor: englishFor,
  };
};
