import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleChoiceTextQuestion } from "../types/test";

interface Props {
  question: MultipleChoiceTextQuestion;
  value: string;
  onChange: (value: string) => void;
}

export const MultipleChoiceText: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {question.options.map((option) => (
        <div key={option} className="flex items-center space-x-3">
          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
          <Label
            htmlFor={`${question.id}-${option}`}
            className="cursor-pointer font-normal"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
