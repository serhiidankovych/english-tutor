"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, BookOpen } from "lucide-react";
import { PageSection } from "../common/section-page";

export function TestSection() {
  const t = useTranslations("TestSection");
  const router = useRouter();

  const levels = t.raw("levels");
  const testInfo = t.raw("testInfo");

  return (
    <PageSection
      title={t("title")}
      description={t("description")}
      icon={<Award className="h-8 w-8 text-primary" />}
    >
      <Card className="max-w-4xl mx-auto mb-12 shadow-lg border-2">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {testInfo.badge}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{testInfo.title}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {testInfo.description}
              </p>
              <Button
                onClick={() => router.push("/test")}
                size="lg"
                className="w-full sm:w-auto group"
              >
                {testInfo.buttonText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={testInfo.image}
                  alt={testInfo.imageAlt}
                  width={280}
                  height={280}
                  className="relative z-10 drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-center">{t("levelsTitle")}</h2>
        </div>

        <div className="w-full">
          <div className="lg:hidden overflow-x-auto">
            <div className="flex gap-6 pb-4 min-w-max">
              {levels.map(
                (
                  level: {
                    level: string;
                    name: string;
                    description: string;
                    color: string;
                  },
                  index: number
                ) => (
                  <div
                    key={level.level || index}
                    className="flex-shrink-0 w-80"
                  >
                    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {level.name}
                          </CardTitle>
                          <Badge variant="outline" className={level.color}>
                            {level.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {level.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map(
              (
                level: {
                  level: string;
                  name: string;
                  description: string;
                  color: string;
                },
                index: number
              ) => (
                <Card
                  key={level.level || index}
                  className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{level.name}</CardTitle>
                      <Badge variant="outline" className={level.color}>
                        {level.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {level.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">{t("footerText")}</p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/test")}
          className="group"
        >
          {t("footerButtonText")}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </PageSection>
  );
}
