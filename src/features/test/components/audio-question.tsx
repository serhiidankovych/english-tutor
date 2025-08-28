"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Answer } from "../types/test";
import { MultipleChoiceText } from "./multiple-choice-text";
import { TextInput } from "./text-input";
import { AudioQuestion as AudioQuestionType } from "../types/test";

interface Props {
  question: AudioQuestionType;
  value: Answer;
  onChange: (value: Answer) => void;
}

export const AudioQuestion: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const renderAnswerComponent = () => {
    switch (question.answerType) {
      case "multiple-choice-text":
        return (
          <MultipleChoiceText
            question={{
              ...question,
              type: "multiple-choice-text",
              options: question.options!,
              correctAnswer: Array.isArray(question.correctAnswer)
                ? question.correctAnswer[0]
                : question.correctAnswer,
            }}
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
          />
        );
      case "text-input":
        return (
          <TextInput
            question={{ ...question, type: "text-input" }}
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <audio ref={audioRef} src={question.audioSrc} preload="metadata" />
      <div className="flex items-center gap-4">
        <Button onClick={togglePlayPause} variant="outline" size="icon">
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <Progress value={progress} className="w-full" />
      </div>
      <div className="pt-4">{renderAnswerComponent()}</div>
    </div>
  );
};
