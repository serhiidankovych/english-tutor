"use client";

import React, { useState, useEffect } from "react";
import { useTestState } from "../hooks/use-test-state";
import { useTestPersistence } from "../hooks/use-test-persistence";
import { testQuestions } from "../data/test-questions";
import { TestData } from "../types/test";

import { ProgressBar } from "../components/progress-bar";
import { QuestionCard } from "../components/question-card";
import { QuestionNavigation } from "../components/question-navigation";
import { TestResults } from "../components/test-results";

import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle } from "lucide-react";

const SaveStatusIndicator = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex justify-end">
    {isLoading ? (
      <Badge variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Saving...
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
        <CheckCircle className="mr-2 h-4 w-4" />
        Saved
      </Badge>
    )}
  </div>
);

export default function TestPage() {
  const { testData, updateTestData } = useTestState();
  const { savedTestData, saveTestData, isLoading } = useTestPersistence();
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && savedTestData !== undefined) {
      const urlParams = new URLSearchParams(window.location.search);
      const hasUrlData = urlParams.has("step") || urlParams.has("answers");
      if (!hasUrlData && savedTestData) {
        updateTestData(savedTestData);
      }
      setHasInitialized(true);
    }
  }, [savedTestData, hasInitialized, updateTestData]);

  useEffect(() => {
    const currentQuestion = testQuestions[testData.currentStep];
    if (currentQuestion) {
      setCurrentAnswer(testData.answers[currentQuestion.id] || "");
    }
  }, [testData.currentStep, testData.answers]);

  useEffect(() => {
    if (hasInitialized) {
      const debounceTimer = setTimeout(() => {
        saveTestData(testData);
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [testData, saveTestData, hasInitialized]);

  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim()) return;
    const currentQuestion = testQuestions[testData.currentStep];
    const newAnswers = {
      ...testData.answers,
      [currentQuestion.id]: currentAnswer,
    };
    const isLastQuestion = testData.currentStep === testQuestions.length - 1;
    const newTestData: TestData = {
      currentStep: isLastQuestion
        ? testData.currentStep
        : testData.currentStep + 1,
      answers: newAnswers,
      completed: isLastQuestion,
    };
    updateTestData(newTestData);
    saveTestData(newTestData);
  };

  const goToStep = (step: number) => {
    updateTestData({ ...testData, currentStep: step, completed: false });
  };

  const goToPrevious = () => {
    if (testData.currentStep > 0) goToStep(testData.currentStep - 1);
  };

  const resetTest = () => {
    const newTestData: TestData = {
      currentStep: 0,
      answers: {},
      completed: false,
    };
    updateTestData(newTestData);
    saveTestData(newTestData);
  };

  const currentQuestion = testQuestions[testData.currentStep];

  if (!hasInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your test...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-2xl mx-auto flex flex-col gap-6">
        <SaveStatusIndicator isLoading={isLoading} />

        <ProgressBar
          currentStep={testData.currentStep}
          totalSteps={testQuestions.length}
          hasCurrentAnswer={!!currentAnswer}
        />

        {!testData.completed ? (
          <QuestionCard
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswerChange={setCurrentAnswer}
            onNext={handleAnswerSubmit}
            onPrevious={goToPrevious}
            canGoPrevious={testData.currentStep > 0}
            isLastQuestion={testData.currentStep === testQuestions.length - 1}
          />
        ) : (
          <TestResults
            questions={testQuestions}
            testData={testData}
            onRestart={resetTest}
          />
        )}

        <QuestionNavigation
          questions={testQuestions}
          testData={testData}
          onNavigateToStep={goToStep}
        />
      </div>
    </main>
  );
}
