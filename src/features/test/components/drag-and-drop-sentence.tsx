"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { DragAndDropQuestion } from "../types/test";
import { cn } from "@/lib/utils";

interface DraggableWordProps {
  id: string;
  isDragging: boolean;
  isInSentence: boolean;
  onWordClick: (word: string) => void;
}

const DraggableWord: React.FC<DraggableWordProps> = ({
  id,
  isDragging,
  isInSentence,
  onWordClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging || isSortableDragging) return;

    e.preventDefault();
    e.stopPropagation();
    onWordClick(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("touch-none select-none", isDragging && "z-50")}
      onClick={handleClick}
    >
      <Badge
        variant={isInSentence ? "default" : "outline"}
        className={cn(
          "p-2 px-4 text-base cursor-pointer transition-colors",
          "hover:bg-primary/10 active:scale-95",
          isDragging && "shadow-lg ring-2 ring-primary/50",
          isInSentence
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "hover:border-primary/50"
        )}
        title={
          isInSentence
            ? "Click to remove from sentence"
            : "Click to add to sentence"
        }
      >
        {id}
      </Badge>
    </div>
  );
};

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode;
  isOver: boolean;
  title: string;
  isEmpty?: boolean;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({
  id,
  children,
  isOver,
  title,
  isEmpty = false,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-[80px] w-full rounded-lg border-2 p-4 transition-colors relative",
          "flex flex-wrap gap-2 items-start",
          id === "sentence"
            ? cn(
                "border-dashed bg-muted/30",
                isOver
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-muted-foreground/25"
              )
            : cn(
                "border-solid bg-background",
                isOver
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border"
              )
        )}
      >
        {children}
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-sm italic text-center py-4">
              {id === "sentence"
                ? "Drag or click words to build your sentence"
                : "Available words"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface Props {
  question: DragAndDropQuestion;
  value: string[];
  onChange: (value: string[]) => void;
}

export const DragAndDropSentence: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [sentence, setSentence] = useState<string[]>(value || []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOverArea, setDragOverArea] = useState<string | null>(null);

  useEffect(() => {
    const sentenceWords = new Set(value || []);
    const availableWords = question.wordBank.filter(
      (word) => !sentenceWords.has(word)
    );
    setWordBank(availableWords);
    setSentence(value || []);
  }, [question.wordBank, value]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleWordClick = (word: string) => {
    const isInSentence = sentence.includes(word);
    const isInWordBank = wordBank.includes(word);

    let newWordBank = [...wordBank];
    let newSentence = [...sentence];

    if (isInWordBank) {
      newWordBank = wordBank.filter((w) => w !== word);
      newSentence = [...sentence, word];
    } else if (isInSentence) {
      newSentence = sentence.filter((w) => w !== word);
      newWordBank = [...wordBank, word];
    }

    setWordBank(newWordBank);
    setSentence(newSentence);
    onChange(newSentence);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!over) {
      setDragOverArea(null);
      return;
    }

    const overId = over.id as string;

    if (overId === "sentence" || overId === "wordBank") {
      setDragOverArea(overId);
    } else {
      const isWordInSentence = sentence.includes(overId);
      const isWordInWordBank = wordBank.includes(overId);

      if (isWordInSentence) {
        setDragOverArea("sentence");
      } else if (isWordInWordBank) {
        setDragOverArea("wordBank");
      } else {
        setDragOverArea(null);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setDragOverArea(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeInSentence = sentence.includes(activeId);
    const activeInWordBank = wordBank.includes(activeId);

    let newWordBank = [...wordBank];
    let newSentence = [...sentence];

    if (overId === "sentence") {
      if (activeInWordBank) {
        newWordBank = wordBank.filter((word) => word !== activeId);
        newSentence = [...sentence, activeId];
      }
    } else if (overId === "wordBank") {
      if (activeInSentence) {
        newSentence = sentence.filter((word) => word !== activeId);
        newWordBank = [...wordBank, activeId];
      }
    } else {
      const overInSentence = sentence.includes(overId);
      const overInWordBank = wordBank.includes(overId);

      if (activeInSentence && overInSentence) {
        const oldIndex = sentence.indexOf(activeId);
        const newIndex = sentence.indexOf(overId);
        newSentence = arrayMove(sentence, oldIndex, newIndex);
      } else if (activeInWordBank && overInWordBank) {
        const oldIndex = wordBank.indexOf(activeId);
        const newIndex = wordBank.indexOf(overId);
        newWordBank = arrayMove(wordBank, oldIndex, newIndex);
      } else if (activeInWordBank && overInSentence) {
        newWordBank = wordBank.filter((word) => word !== activeId);
        const targetIndex = sentence.indexOf(overId);
        newSentence = [...sentence];
        newSentence.splice(targetIndex, 0, activeId);
      } else if (activeInSentence && overInWordBank) {
        newSentence = sentence.filter((word) => word !== activeId);
        const targetIndex = wordBank.indexOf(overId);
        newWordBank = [...wordBank];
        newWordBank.splice(targetIndex, 0, activeId);
      }
    }

    setWordBank(newWordBank);
    setSentence(newSentence);
    onChange(newSentence);
  };

  const resetSentence = () => {
    setWordBank([...question.wordBank]);
    setSentence([]);
    onChange([]);
  };

  const getSentenceText = () => sentence.join(" ");

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <DroppableArea
          id="sentence"
          isOver={dragOverArea === "sentence"}
          title="Build your sentence:"
          isEmpty={sentence.length === 0}
        >
          <SortableContext items={sentence} strategy={rectSortingStrategy}>
            {sentence.map((word) => (
              <DraggableWord
                key={word}
                id={word}
                isDragging={activeId === word}
                isInSentence={true}
                onWordClick={handleWordClick}
              />
            ))}
          </SortableContext>
        </DroppableArea>

        <DroppableArea
          id="wordBank"
          isOver={dragOverArea === "wordBank"}
          title="Available words:"
          isEmpty={wordBank.length === 0}
        >
          <SortableContext items={wordBank} strategy={rectSortingStrategy}>
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                id={word}
                isDragging={activeId === word}
                isInSentence={false}
                onWordClick={handleWordClick}
              />
            ))}
          </SortableContext>
        </DroppableArea>
      </DndContext>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <p>
          <strong>Instructions:</strong> Click on any word to add it to your
          sentence, or drag and drop to arrange them. Click on words in the
          sentence to remove them.
        </p>
      </div>

      {sentence.length > 0 && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Current sentence:
          </p>
          <p className="text-lg font-medium">{getSentenceText()}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={resetSentence}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          disabled={sentence.length === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
