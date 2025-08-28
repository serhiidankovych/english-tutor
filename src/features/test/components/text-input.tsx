import React from "react";
import { Input } from "@/components/ui/input";
import { TextInputQuestion } from "../types/test";

interface Props {
  question: TextInputQuestion;
  value: string;
  onChange: (value: string) => void;
}

export const TextInput: React.FC<Props> = ({ question, value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder || "Your answer"}
      minLength={question.validation?.minLength}
      maxLength={question.validation?.maxLength}
    />
  );
};
