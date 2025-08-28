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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

interface TestResultsProps {
  questions: Question[];
  testData: TestData;
  onRestart: () => void;
}

interface ScoreData {
  totalScore: number;
  maxScore: number;
  percentage: number;
  correctAnswers: number;
  totalAnswers: number;
  levelBreakdown: Record<
    string,
    {
      correct: number;
      total: number;
      score: number;
      maxScore: number;
    }
  >;
}

export const TestResults: React.FC<TestResultsProps> = ({
  questions,
  testData,
  onRestart,
}) => {
  const calculateScore = (): ScoreData => {
    let totalScore = 0;
    let maxScore = 0;
    let correctAnswers = 0;
    const levelBreakdown: Record<
      string,
      {
        correct: number;
        total: number;
        score: number;
        maxScore: number;
      }
    > = {};

    questions.forEach((question) => {
      const userAnswer = testData.answers[question.id];
      maxScore += question.score;

      if (!levelBreakdown[question.level]) {
        levelBreakdown[question.level] = {
          correct: 0,
          total: 0,
          score: 0,
          maxScore: 0,
        };
      }
      levelBreakdown[question.level].total++;
      levelBreakdown[question.level].maxScore += question.score;

      let isCorrect = false;

      if (question.type === "word-bank-selection") {
        if (typeof userAnswer === "string" && userAnswer) {
          const wordAnswered = Object.keys(question.definitions).find((key) =>
            question.definitions[key].options.includes(userAnswer)
          );
          if (wordAnswered) {
            isCorrect =
              question.definitions[wordAnswered].correctAnswer === userAnswer;
          }
        }
      } else {
        const correctAnswer = question.correctAnswer;
        if (
          typeof userAnswer === "string" &&
          typeof correctAnswer === "string"
        ) {
          isCorrect =
            userAnswer.toLowerCase().trim() ===
            correctAnswer.toLowerCase().trim();
        } else if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
          isCorrect =
            JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        } else if (
          Array.isArray(userAnswer) &&
          typeof correctAnswer === "string"
        ) {
          isCorrect =
            userAnswer.join(" ").toLowerCase().trim() ===
            correctAnswer.toLowerCase().trim();
        }
      }

      if (isCorrect) {
        totalScore += question.score;
        correctAnswers++;
        levelBreakdown[question.level].correct++;
        levelBreakdown[question.level].score += question.score;
      }
    });

    return {
      totalScore,
      maxScore,
      percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0,
      correctAnswers,
      totalAnswers: questions.length,
      levelBreakdown,
    };
  };

  const scoreData = calculateScore();

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90)
      return {
        level: "Excellent",
        color: "bg-green-500",
        textColor: "text-green-700",
      };
    if (percentage >= 80)
      return {
        level: "Very Good",
        color: "bg-blue-500",
        textColor: "text-blue-700",
      };
    if (percentage >= 70)
      return {
        level: "Good",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
      };
    if (percentage >= 60)
      return {
        level: "Satisfactory",
        color: "bg-orange-500",
        textColor: "text-orange-700",
      };
    return {
      level: "Needs Improvement",
      color: "bg-red-500",
      textColor: "text-red-700",
    };
  };

  const performance = getPerformanceLevel(scoreData.percentage);

  const levelOrder = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const sortedLevels = Object.entries(scoreData.levelBreakdown).sort(
    ([a], [b]) => levelOrder.indexOf(a) - levelOrder.indexOf(b)
  );

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto border-2 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Test Completed!
          </CardTitle>
          <CardDescription className="text-lg">
            Here are your detailed results
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {scoreData.totalScore}/{scoreData.maxScore}
                </div>
                <div className="text-sm text-muted-foreground">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {scoreData.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            <Progress value={scoreData.percentage} className="w-full h-3" />

            <Badge
              variant="secondary"
              className={`${performance.color} text-white text-lg px-4 py-2`}
            >
              {performance.level}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {scoreData.correctAnswers}
                  </div>
                  <div className="text-sm text-green-600">Correct</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-center space-x-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-700">
                    {scoreData.totalAnswers - scoreData.correctAnswers}
                  </div>
                  <div className="text-sm text-red-600">Incorrect</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Performance by Level</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sortedLevels.map(([level, data]) => {
                const levelPercentage =
                  data.total > 0
                    ? Math.round((data.correct / data.total) * 100)
                    : 0;
                const levelPerformance = getPerformanceLevel(levelPercentage);

                return (
                  <Card key={level} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="font-semibold">
                        {level}
                      </Badge>
                      <span
                        className={`text-sm font-medium ${levelPerformance.textColor}`}
                      >
                        {levelPercentage}%
                      </span>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2">
                      {data.correct}/{data.total} correct • {data.score}/
                      {data.maxScore} points
                    </div>

                    <Progress value={levelPercentage} className="h-2" />
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Question Review</span>
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {questions.map((question) => {
                const userAnswer = testData.answers[question.id];
                const isCorrect = (() => {
                  if (question.type === "word-bank-selection") {
                    if (typeof userAnswer === "string" && userAnswer) {
                      const wordAnswered = Object.keys(
                        question.definitions
                      ).find((key) =>
                        question.definitions[key].options.includes(userAnswer)
                      );
                      if (wordAnswered) {
                        return (
                          question.definitions[wordAnswered].correctAnswer ===
                          userAnswer
                        );
                      }
                    }
                    return false;
                  }

                  const correctAnswer = question.correctAnswer;
                  if (
                    typeof userAnswer === "string" &&
                    typeof correctAnswer === "string"
                  ) {
                    return (
                      userAnswer.toLowerCase().trim() ===
                      correctAnswer.toLowerCase().trim()
                    );
                  } else if (
                    Array.isArray(userAnswer) &&
                    typeof correctAnswer === "string"
                  ) {
                    return (
                      userAnswer.join(" ").toLowerCase().trim() ===
                      correctAnswer.toLowerCase().trim()
                    );
                  }
                  return false;
                })();

                return (
                  <Card
                    key={question.id}
                    className={`p-4 border-l-4 ${
                      isCorrect
                        ? "border-l-green-500 bg-green-50"
                        : "border-l-red-500 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {question.level}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {question.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {question.score} pts
                          </span>
                        </div>

                        <h4 className="font-medium text-sm mb-1">
                          {question.question}
                        </h4>

                        <div className="text-sm space-y-1">
                          <div>
                            <span className="text-muted-foreground">
                              Your answer:{" "}
                            </span>
                            <span
                              className={
                                isCorrect ? "text-green-700" : "text-red-700"
                              }
                            >
                              {Array.isArray(userAnswer)
                                ? userAnswer.join(", ")
                                : userAnswer || "No answer provided"}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div>
                              <span className="text-muted-foreground">
                                Correct answer:{" "}
                              </span>
                              <span className="text-green-700 font-medium">
                                {(() => {
                                  if (question.type === "word-bank-selection") {
                                    if (
                                      typeof userAnswer === "string" &&
                                      userAnswer
                                    ) {
                                      const wordAnswered = Object.keys(
                                        question.definitions
                                      ).find((key) =>
                                        question.definitions[
                                          key
                                        ].options.includes(userAnswer)
                                      );
                                      return wordAnswered
                                        ? question.definitions[wordAnswered]
                                            .correctAnswer
                                        : "N/A";
                                    }
                                    return "N/A";
                                  }
                                  return Array.isArray(question.correctAnswer)
                                    ? question.correctAnswer.join(", ")
                                    : question.correctAnswer;
                                })()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-6">
          <Button onClick={onRestart} size="lg" className="px-8">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Test
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
