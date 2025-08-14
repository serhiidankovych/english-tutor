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
import { Check } from "lucide-react";

interface TestResultsProps {
  questions: Question[];
  testData: TestData;
  onRestart: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  questions,
  testData,
  onRestart,
}) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="items-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Test Completed!</CardTitle>
        <CardDescription>
          Thank you for completing the test. Here are your answers:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-card-foreground">
              {question.question}
            </h3>
            <p className="text-muted-foreground mt-1">
              <strong>Your answer:</strong>{" "}
              {testData.answers[question.id] || "No answer provided"}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onRestart}>Start New Test</Button>
      </CardFooter>
    </Card>
  );
};
