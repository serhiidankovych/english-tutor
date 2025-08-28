import React from "react";
import { Question, TestData } from "../types/test";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SaveStatusIndicator } from "./save-status";

interface QuestionNavigationProps {
  questions: Question[];
  testData: TestData;
  onNavigateToStep: (step: number) => void;
  isLoading: boolean;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  testData,
  onNavigateToStep,
  isLoading,
}) => {
  const t = useTranslations("Test");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-between">
          {t("title")}
          <SaveStatusIndicator isLoading={isLoading} />
        </CardTitle>
        <CardDescription className="text-gray-600">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-left flex-wrap gap-2">
          {questions.map((question, index) => {
            const isCurrent = testData.currentStep === index;
            const isAnswered = !!testData.answers[question.id];

            return (
              <Button
                key={index}
                onClick={() => onNavigateToStep(index)}
                className={cn(
                  "w-10 h-10 p-0 font-semibold",
                  isAnswered &&
                    !isCurrent &&
                    "bg-muted text-green-800 hover:bg-muted border border-muted"
                )}
                variant={isCurrent ? "default" : "outline"}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
