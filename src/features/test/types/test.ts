interface QuestionBase {
  id: string;
  question: string;
  explanation?: string;
  score: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  tags?: string[];
  injected?: boolean;
}

export interface MultipleChoiceTextQuestion extends QuestionBase {
  type: "multiple-choice-text";
  options: string[];
  correctAnswer: string;
}

export interface MultipleChoiceImageQuestion extends QuestionBase {
  type: "multiple-choice-image";
  text?: string;
  images: { src: string; alt: string }[];
  options: string[];
  correctAnswer: string;
}

export interface TextInputQuestion extends QuestionBase {
  type: "text-input";
  placeholder?: string;
  correctAnswer: string | string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

export interface DragAndDropQuestion extends QuestionBase {
  type: "drag-and-drop";
  wordBank: string[];
  correctAnswer: string;
}

export interface AudioQuestion extends QuestionBase {
  type: "audio";
  audioSrc: string;
  answerType: "multiple-choice-text" | "text-input";
  options?: string[];
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
  correctAnswer: string | string[];
}

export type Answer = string | string[] | null | undefined;

export interface TestData {
  currentStep: number;
  answers: { [questionId: string]: Answer };
  completed: boolean;
}

export interface WordBankSelectionQuestion extends QuestionBase {
  type: "word-bank-selection";
  wordOptions: string[];
  definitions: Record<
    string,
    {
      question: string;
      options: string[];
      correctAnswer: string;
    }
  >;
}

export type Question =
  | MultipleChoiceTextQuestion
  | MultipleChoiceImageQuestion
  | TextInputQuestion
  | DragAndDropQuestion
  | AudioQuestion
  | WordBankSelectionQuestion;
