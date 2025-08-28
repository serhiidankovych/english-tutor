"use client";

import React, { useEffect } from "react";
import { useTestStore } from "../store/test-store";
import { testQuestions } from "../data/test-questions";

import { QuestionCard } from "../components/question-card";
import { QuestionNavigation } from "../components/question-navigation";
import { TestResults } from "../components/test-results";

import { QuestionNavigationSkeleton } from "../components/question-navigation-skeleton";
import { QuestionCardSkeleton } from "../components/question-card-skeleton";
import { Answer } from "../types/test";

export default function TestPage() {
  const {
    testData,
    currentAnswer,
    hasInitialized,
    isLoading,
    updateTestData,
    setCurrentAnswer,
    initializeFromUrl,
    initializeCurrentAnswer,
    handleAnswerSubmit,
    goToStep,
    goToPrevious,
    resetTest,
    getCurrentQuestion,
    canGoPrevious,
    isLastQuestion,
  } = useTestStore();

  useEffect(() => {
    if (!hasInitialized) {
      initializeFromUrl();
    }
  }, [hasInitialized, initializeFromUrl]);

  useEffect(() => {
    if (hasInitialized) {
      initializeCurrentAnswer();
    }
  }, [testData.currentStep, hasInitialized, initializeCurrentAnswer]);

  const handleAnswerChange = (answer: Answer) => {
    setCurrentAnswer(answer);
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      updateTestData({
        ...testData,
        answers: {
          ...testData.answers,
          [currentQuestion.id]: answer,
        },
      });
    }
  };

  const handleNext = () => {
    handleAnswerSubmit();
  };

  const currentQuestion = getCurrentQuestion();

  if (!hasInitialized) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container max-w-2xl mx-auto flex flex-col gap-6">
          <QuestionNavigationSkeleton />
          <QuestionCardSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-2xl mx-auto flex flex-col gap-6">
        <QuestionNavigation
          questions={testQuestions}
          testData={testData}
          onNavigateToStep={goToStep}
          isLoading={isLoading}
        />

        {!testData.completed ? (
          <QuestionCard
            index={testData.currentStep + 1}
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={goToPrevious}
            canGoPrevious={canGoPrevious()}
            isLastQuestion={isLastQuestion()}
          />
        ) : (
          <TestResults
            questions={testQuestions}
            testData={testData}
            onRestart={resetTest}
          />
        )}
      </div>
    </main>
  );
}
