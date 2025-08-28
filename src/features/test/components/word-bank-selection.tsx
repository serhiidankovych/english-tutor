import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle, HelpCircle } from "lucide-react";

import { WordBankSelectionQuestion } from "../types/test";

interface WordBankSelectionProps {
  question: WordBankSelectionQuestion;
  value: string;
  onChange: (value: string) => void;
}

const WordBankSelection: React.FC<WordBankSelectionProps> = ({
  question,
  value,
  onChange,
}) => {
  const { wordOptions, definitions, id: questionId } = question;

  const [phase, setPhase] = useState<"selection" | "definition">("selection");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [quizWord, setQuizWord] = useState<string | null>(null);

  const handleWordToggle = (word: string) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const handleStartQuiz = () => {
    if (selectedWords.length === 0) return;
    const randomIndex = Math.floor(Math.random() * selectedWords.length);
    const randomWord = selectedWords[randomIndex];
    setQuizWord(randomWord);
    setPhase("definition");
    onChange("");
  };

  const handleGoBack = () => {
    setPhase("selection");
    setQuizWord(null);
    onChange("");
  };

  if (phase === "definition" && quizWord) {
    const currentWord = quizWord;
    const definitionData = definitions[currentWord];

    if (!definitionData) {
      return (
        <div>
          Error: Definition not found for {currentWord}. Please check data.
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Selection
          </Button>
          <Badge variant="outline">Quick Quiz: 1 Question</Badge>
        </div>

        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-blue-800">
                {currentWord}
              </div>
              <p className="text-lg text-gray-700">{definitionData.question}</p>
            </div>
          </CardContent>
        </Card>

        <RadioGroup
          value={value || ""}
          onValueChange={onChange}
          className="space-y-3"
        >
          {definitionData.options.map((option, index) => (
            <Card
              key={option}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                value === option
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              )}
            >
              <CardContent className="pt-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option}
                    id={`${questionId}-${option}`}
                  />
                  <Label
                    htmlFor={`${questionId}-${option}`}
                    className="cursor-pointer font-normal flex-1"
                  >
                    <span className="font-medium text-blue-600 mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {wordOptions.map((word) => (
            <Button
              key={word}
              variant={selectedWords.includes(word) ? "default" : "outline"}
              onClick={() => handleWordToggle(word)}
              className={cn(
                "h-12 transition-all text-left justify-start",
                selectedWords.includes(word) && "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <span className="truncate">{word}</span>
              {selectedWords.includes(word) && (
                <CheckCircle className="h-4 w-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Button
              onClick={handleStartQuiz}
              disabled={selectedWords.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
              size="lg"
            >
              Start Random Quiz ({selectedWords.length} words in bank)
            </Button>
            {selectedWords.length === 0 && (
              <p className="text-sm text-gray-500">
                Select at least one word to continue
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordBankSelection;
