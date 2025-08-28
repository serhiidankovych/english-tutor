import { create } from "zustand";
import { persist } from "zustand/middleware";
import { testQuestions } from "../data/test-questions";
import { TestData, Answer, Question } from "../types/test";

interface TestStore {
  testData: TestData;
  currentAnswer: Answer;
  hasInitialized: boolean;
  isLoading: boolean;

  updateTestData: (data: TestData) => void;
  setCurrentAnswer: (answer: Answer) => void;
  setHasInitialized: (initialized: boolean) => void;
  setIsLoading: (loading: boolean) => void;

  initializeFromUrl: () => void;
  initializeCurrentAnswer: () => void;
  handleAnswerSubmit: () => boolean;
  goToStep: (step: number) => void;
  goToPrevious: () => void;
  resetTest: () => void;

  isAnswerProvided: (answer?: Answer) => boolean;
  getCurrentQuestion: () => Question;
  canGoPrevious: () => boolean;
  isLastQuestion: () => boolean;
}

const initialTestData: TestData = {
  currentStep: 0,
  answers: {},
  completed: false,
};

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      testData: initialTestData,
      currentAnswer: "",
      hasInitialized: false,
      isLoading: true,

      updateTestData: (data) => set({ testData: data }),
      setCurrentAnswer: (answer) => set({ currentAnswer: answer }),
      setHasInitialized: (initialized) => set({ hasInitialized: initialized }),
      setIsLoading: (loading) => set({ isLoading: loading }),

      initializeFromUrl: () => {
        const urlParams = new URLSearchParams(window.location.search);
        const hasUrlData = urlParams.has("step") || urlParams.has("answers");

        if (hasUrlData) {
          const step = urlParams.get("step");
          if (step && !isNaN(Number(step))) {
            const stepNumber = Number(step);
            if (stepNumber >= 0 && stepNumber < testQuestions.length) {
              set((state) => ({
                testData: {
                  ...state.testData,
                  currentStep: stepNumber,
                },
              }));
            }
          }
        }

        set({ hasInitialized: true, isLoading: false });
      },

      initializeCurrentAnswer: () => {
        const { testData } = get();
        const currentQuestion = testQuestions[testData.currentStep];

        if (currentQuestion) {
          const existingAnswer = testData.answers[currentQuestion.id];
          if (existingAnswer) {
            set({ currentAnswer: existingAnswer });
          } else {
            const defaultAnswer =
              currentQuestion.type === "drag-and-drop" ? [] : "";
            set({ currentAnswer: defaultAnswer });
          }
        }
      },

      handleAnswerSubmit: () => {
        const { testData, currentAnswer, isAnswerProvided } = get();

        if (!isAnswerProvided(currentAnswer)) {
          return false;
        }

        const currentQuestion = testQuestions[testData.currentStep];
        const newAnswers = {
          ...testData.answers,
          [currentQuestion.id]: currentAnswer,
        };

        const isLastQuestion =
          testData.currentStep === testQuestions.length - 1;

        if (
          currentQuestion.type === "drag-and-drop" &&
          Array.isArray(currentAnswer)
        ) {
          newAnswers[currentQuestion.id] = currentAnswer.join(" ");
        }

        const newTestData: TestData = {
          currentStep: isLastQuestion
            ? testData.currentStep
            : testData.currentStep + 1,
          answers: newAnswers,
          completed: isLastQuestion,
        };

        set({ testData: newTestData });

        if (!isLastQuestion) {
          const nextQuestion = testQuestions[newTestData.currentStep];
          if (nextQuestion) {
            const nextAnswer =
              newTestData.answers[nextQuestion.id] ||
              (nextQuestion.type === "drag-and-drop" ? [] : "");
            set({ currentAnswer: nextAnswer });
          }
        }

        return true;
      },

      goToStep: (step) => {
        const { testData } = get();
        const newTestData = {
          ...testData,
          currentStep: step,
          completed: false,
        };
        set({ testData: newTestData });

        const question = testQuestions[step];
        if (question) {
          const answer =
            newTestData.answers[question.id] ||
            (question.type === "drag-and-drop" ? [] : "");
          set({ currentAnswer: answer });
        }
      },

      goToPrevious: () => {
        const { testData, goToStep } = get();
        if (testData.currentStep > 0) {
          goToStep(testData.currentStep - 1);
        }
      },

      resetTest: () => {
        const newTestData = { ...initialTestData };
        set({
          testData: newTestData,
          currentAnswer: testQuestions[0]?.type === "drag-and-drop" ? [] : "",
        });
      },

      isAnswerProvided: (answer) => {
        const answerToCheck =
          answer !== undefined ? answer : get().currentAnswer;

        if (typeof answerToCheck === "string") {
          return answerToCheck.trim().length > 0;
        }
        if (Array.isArray(answerToCheck)) {
          return answerToCheck.length > 0;
        }
        return false;
      },

      getCurrentQuestion: () => {
        const { testData } = get();
        return testQuestions[testData.currentStep];
      },

      canGoPrevious: () => {
        const { testData } = get();
        return testData.currentStep > 0;
      },

      isLastQuestion: () => {
        const { testData } = get();
        return testData.currentStep === testQuestions.length - 1;
      },
    }),
    {
      name: "test-storage",
      partialize: (state) => ({
        testData: state.testData,
      }),
    }
  )
);
