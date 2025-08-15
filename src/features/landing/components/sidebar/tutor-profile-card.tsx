import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlassContainer } from "@/components/glass-container";
import { MessageCircleDashed, Send } from "lucide-react";

export function TutorProfileCard() {
  const t = useTranslations("TutorProfile");
  const tutorData = t.raw("tutor");
  const buttons = t.raw("buttons");

  return (
    <GlassContainer>
      <Card className="relative overflow-hidden rounded-2xl shadow-xl border-white/50 border-2 text-white h-[650px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${tutorData.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <div className="space-y-4 text-center">
            <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
              {tutorData.name}
            </CardTitle>
            <CardDescription className="text-base text-white/90 italic drop-shadow">
              {tutorData.title} • {tutorData.experience}
            </CardDescription>
            <div className="flex flex-wrap gap-2 justify-center">
              {tutorData.badges.map((badge: string) => (
                <Badge
                  key={badge}
                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30"
                >
                  {badge}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <a
                href="https://t.me/vikkktoriia_km"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" aria-label="Telegram">
                  <Send className="w-4 h-4 mr-1" /> {buttons.telegram}
                </Button>
              </a>
              <Button
                variant="secondary"
                size="sm"
                aria-label="WhatsApp"
                disabled
              >
                <MessageCircleDashed className="w-4 h-4 mr-1" />
                {buttons.whatsapp}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </GlassContainer>
  );
}
