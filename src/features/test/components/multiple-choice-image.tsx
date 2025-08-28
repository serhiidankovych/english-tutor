import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleChoiceImageQuestion } from "../types/test";

interface Props {
  question: MultipleChoiceImageQuestion;
  value: string;
  onChange: (value: string) => void;
}

export const MultipleChoiceImage: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <p className="font-serif">{question.text}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video w-full overflow-hidden rounded-lg border"
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-3 pt-4"
      >
        {question.options.map((option) => (
          <div key={option} className="flex items-center space-x-3">
            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
            <Label
              htmlFor={`${question.id}-${option}`}
              className="cursor-pointer font-normal"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
