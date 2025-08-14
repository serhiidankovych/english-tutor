import React from "react";
import { Question } from "../types/test";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: Question;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoPrevious,
  isLastQuestion,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question</CardTitle>
        <CardDescription>{question.question}</CardDescription>
      </CardHeader>
      <CardContent>
        {question.type === "multiple-choice" ? (
          <RadioGroup
            value={currentAnswer}
            onValueChange={onAnswerChange}
            className="space-y-2"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <Input
            value={currentAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Your answer"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
        <Button onClick={onNext} disabled={!currentAnswer.trim()}>
          {isLastQuestion ? "Finish Test" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};
