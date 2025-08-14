import React from "react";
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "../types/test";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
}) => {
  return (
    <RadioGroup
      value={currentAnswer}
      onValueChange={onAnswerChange}
      className="space-y-2"
    >
      {question.options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={option} />
          <Label htmlFor={option} className="font-normal">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
