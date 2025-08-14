import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Video } from "lucide-react";

export function QuickContactCard() {
  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Quick Contact</CardTitle>
        <CardDescription>
          Get answers to your questions instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-accent/50 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Send Message
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-accent/50 transition-colors"
        >
          <Video className="w-4 h-4 mr-2" />
          Schedule Call
        </Button>
      </CardContent>
    </Card>
  );
}
