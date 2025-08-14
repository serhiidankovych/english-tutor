import {
  BookOpen,
  Clock,
  Users,
  Star,
  MessageCircle,
  Award,
  CheckCircle,
  Globe,
} from "lucide-react";
import { color } from "motion";

export const heroStatsData = [
  {
    icon: Users,
    label: " Internationally Experienced ",
    value: "💼 Studied in the UK, Germany & Italy",
  },
  {
    icon: Clock,
    label: "Well-Traveled & Culturally Fluent",
    value: "Well-Traveled & Culturally Fluent",
  },
  {
    icon: Globe,
    label: "Trusted by Global Learners",
    value: "Trusted by Global Learners",
  },
  {
    icon: Award,
    label: "Attended Global Programs & Events",
    value: "Attended Global Programs & Events",
  },
];

export const learningProcessSteps = [
  {
    step: "Step 1",
    title: "Assessment & Goals",
    description:
      "We start by understanding your current level and defining clear, achievable learning objectives tailored to your needs.",
    icon: CheckCircle,
    image: "/step-1.png",
    color: "rgba(194, 22, 22, 0.2)",
  },
  {
    step: "Step 2",
    title: "Personalized Plan",
    description:
      "Create a customized learning roadmap with interactive lessons, practical exercises, and real-world applications.",
    icon: BookOpen,
    image: "/step-2.png",
    color: "rgba(194, 111, 22, 0.2)",
  },
  {
    step: "Step 3",
    title: "Practice & Feedback",
    description:
      "Engage in conversational practice with immediate feedback and corrections to build confidence and fluency.",
    icon: MessageCircle,
    image: "/step-3.png",
    color: "rgba(191, 194, 22, 0.2)",
  },
  {
    step: "Step 4",
    title: "Progress Tracking",
    description:
      "Monitor your improvement with regular assessments and celebrate milestones as you achieve your goals.",
    icon: Award,
    image: "/step-4.png",
    color: "rgba(22, 148, 194, 0.2)",
  },
];

export const tutorProfileData = {
  name: "Viktoriia 💅",
  title: "Certified English Tutor",
  experience: "5+ Years",
  imageUrl: "/viktoriia.jpg",
  badges: ["A1–C1", "Business English", "Conversational"],
  availability: "Mon–Fri, 9am–10pm",
  rating: 4.9,
  reviewsCount: 120,
  languages: ["English", "Ukrainian"],
  pricePerHour: "$20/hr",
  bio: "Passionate about helping students gain confidence in speaking. Specializes in business and conversational English.",
  contacts: {
    instagram: "#",
    telegram: "#",
    whatsapp: "#",
  },
};

export const englishFor = ["Teens", "Travel", "Work", "Adults", "Soul", "Kids"];

export const testimonialData = {
  quote:
    "Viktoriia helped me improve my English dramatically. Her teaching method is very effective!",
  author: "John Smith",
  role: "Business Professional",
  avatarFallback: "JS",
  rating: 5,
};
