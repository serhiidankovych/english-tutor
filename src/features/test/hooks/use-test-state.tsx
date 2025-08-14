import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TestData } from "../types/test";
import { testQuestions } from "../data/test-questions";

export const useTestState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [testData, setTestData] = useState<TestData>({
    currentStep: 0,
    answers: {},
    completed: false,
  });

  const loadFromURL = () => {
    const step = parseInt(searchParams.get("step") || "0");
    const answersParam = searchParams.get("answers");
    const completed = searchParams.get("completed") === "true";

    let answers: Record<string, string> = {};
    if (answersParam) {
      try {
        answers = JSON.parse(decodeURIComponent(answersParam));
      } catch (error) {
        console.error("Error parsing answers from URL:", error);
      }
    }

    return {
      currentStep: Math.max(0, Math.min(step, testQuestions.length - 1)),
      answers,
      completed,
    };
  };

  const updateURL = (newTestData: TestData) => {
    const params = new URLSearchParams();
    params.set("step", newTestData.currentStep.toString());
    params.set(
      "answers",
      encodeURIComponent(JSON.stringify(newTestData.answers))
    );
    if (newTestData.completed) {
      params.set("completed", "true");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const urlState = loadFromURL();
    setTestData(urlState);
  }, [searchParams]);

  const updateTestData = (newData: TestData) => {
    setTestData(newData);
    updateURL(newData);
  };

  return {
    testData,
    updateTestData,
    loadFromURL,
  };
};
