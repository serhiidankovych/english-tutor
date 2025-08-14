import React from "react";
import { TextInputQuestion as TextInputQuestionType } from "../types/test";
import { Textarea } from "@/components/ui/textarea";

interface TextInputQuestionProps {
  question: TextInputQuestionType;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export const TextInputQuestion: React.FC<TextInputQuestionProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
}) => {
  return (
    <Textarea
      value={currentAnswer}
      onChange={(e) => onAnswerChange(e.target.value)}
      placeholder={question.placeholder || "Enter your answer..."}
      className="resize-none h-32"
    />
  );
};
