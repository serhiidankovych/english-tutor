import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { Question, Answer } from "../types/test";

import { AudioQuestion } from "./audio-question";
import { DragAndDropSentence } from "./drag-and-drop-sentence";
import { MultipleChoiceImage } from "./multiple-choice-image";
import { MultipleChoiceText } from "./multiple-choice-text";
import { TextInput } from "./text-input";
import WordBankSelection from "./word-bank-selection";
import { useTestStore } from "../store/test-store";

interface QuestionCardProps {
  index: number;
  question: Question;
  currentAnswer: Answer;
  onAnswerChange: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  index,
  question,
  currentAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoPrevious,
  isLastQuestion,
}) => {
  const t = useTranslations("Test");
  const { isAnswerProvided } = useTestStore();

  const renderQuestionComponent = () => {
    switch (question.type) {
      case "multiple-choice-text":
        return (
          <MultipleChoiceText
            question={question}
            value={typeof currentAnswer === "string" ? currentAnswer : ""}
            onChange={onAnswerChange}
          />
        );
      case "multiple-choice-image":
        return (
          <MultipleChoiceImage
            question={question}
            value={typeof currentAnswer === "string" ? currentAnswer : ""}
            onChange={onAnswerChange}
          />
        );
      case "text-input":
        return (
          <TextInput
            question={question}
            value={typeof currentAnswer === "string" ? currentAnswer : ""}
            onChange={onAnswerChange}
          />
        );
      case "drag-and-drop":
        return (
          <DragAndDropSentence
            question={question}
            value={Array.isArray(currentAnswer) ? currentAnswer : []}
            onChange={onAnswerChange}
          />
        );
      case "audio":
        return (
          <AudioQuestion
            question={question}
            value={currentAnswer}
            onChange={onAnswerChange}
          />
        );
      case "word-bank-selection":
        return (
          <WordBankSelection
            question={question}
            value={typeof currentAnswer === "string" ? currentAnswer : ""}
            onChange={onAnswerChange}
          />
        );
      default:
        return <div>Unsupported question type.</div>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle>
            <Badge>
              {index}. {t("question")}
            </Badge>
          </CardTitle>
          <Badge variant="secondary">{question.category}</Badge>
        </div>
        <CardDescription className="text-lg text-foreground pt-2">
          {question.question}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[150px]">
        {renderQuestionComponent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          {t("previousQuestion")}
        </Button>
        <Button onClick={onNext} disabled={!isAnswerProvided(currentAnswer)}>
          {isLastQuestion ? t("finishTest") : t("nextQuestion")}
        </Button>
      </CardFooter>
    </Card>
  );
};
