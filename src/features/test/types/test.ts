export interface MultipleChoiceQuestion {
  id: string;
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  tags: string[];
  explanation: string;
  score: number;
}

export interface TextInputQuestion {
  id: string;
  type: "text-input";
  question: string;
  placeholder?: string;
}

export type Question = MultipleChoiceQuestion | TextInputQuestion;

export interface TestData {
  currentStep: number;
  answers: Record<string, string>;
  completed: boolean;
}
