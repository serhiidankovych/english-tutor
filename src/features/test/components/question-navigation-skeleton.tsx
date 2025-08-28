import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const QuestionNavigationSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[120px]" />
        <Skeleton className="h-4 w-[280px]" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-left flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-10 h-10" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
