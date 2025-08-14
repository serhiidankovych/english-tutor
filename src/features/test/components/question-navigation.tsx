import React from "react";
import { Question, TestData } from "../types/test";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionNavigationProps {
  questions: Question[];
  testData: TestData;
  onNavigateToStep: (step: number) => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  testData,
  onNavigateToStep,
}) => {
  return (
    <Card>
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
      <CardFooter>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary rounded mr-2"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 rounded mr-2 border"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-muted rounded mr-2"></div>
            <span>Not Answered</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
