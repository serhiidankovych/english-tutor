import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  hasCurrentAnswer: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  hasCurrentAnswer,
}) => {
  const progress =
    ((currentStep + (hasCurrentAnswer ? 1 : 0)) / totalSteps) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800">
          Interactive Test
        </CardTitle>
        <CardDescription className="text-gray-600">
          Answer all questions to complete the test. Your progress is
          automatically saved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </CardContent>
    </Card>
  );
};
