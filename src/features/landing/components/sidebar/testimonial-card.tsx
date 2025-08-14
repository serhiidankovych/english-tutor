import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useLandingData } from "@/features/landing/hooks/use-landing-data";

export function TestimonialCard() {
  const { testimonial } = useLandingData();

  return (
    <Card className="border-0 bg-muted/30 backdrop-blur-sm shadow-lg">
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <blockquote className="text-sm mb-4 leading-relaxed">
          {testimonial.quote}
        </blockquote>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {testimonial.avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{testimonial.author}</div>
            <div className="text-xs text-muted-foreground">
              {testimonial.role}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
