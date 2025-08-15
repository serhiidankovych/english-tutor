import React from "react";
import { useTranslations } from "next-intl";
import { ProcessStepCard, ProcessStepCardProps } from "./process-step-card";
import Image from "next/image";
import { Target } from "lucide-react";
import { PageSection } from "../common/section-page";
import { LearningProcessSectionHeader } from "./learnig-process-header";

export function LearningProcessSection() {
  const t = useTranslations("LearningProcess");
  const processSteps = t.raw("processSteps");

  return (
    <PageSection
      title={<LearningProcessSectionHeader />}
      description={t("description")}
      icon={<Target className="h-8 w-8 text-primary" />}
      titleLevel="h1"
    >
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/4 sm:sticky lg:block top-25">
          <div className="relative rotate-[-4deg] max-w-xl border border-muted rounded-lg shadow-md p-6 notebook-paper before:content-[''] before:absolute before:inset-0 before:bg-[url('/paper-texture.png')] before:opacity-10 before:rounded-lg before:pointer-events-none">
            <Image
              src="/paperclip.png"
              alt="Paperclip"
              width={80}
              height={80}
              className="absolute -top-8 -left-4 rotate-[15deg]"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-2">
              {t("journeyTitle")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light font-serif">
              {t("journeyDescription")}
            </p>
          </div>
        </div>

        <div className="md:w-2/3 w-full">
          <div className="lg:hidden overflow-x-auto">
            <div className="flex gap-6 pb-4 min-w-max">
              {processSteps.map((step: ProcessStepCardProps, index: number) => (
                <div
                  key={step.step || index}
                  className="flex-shrink-0 w-80 transform transition-all duration-300 hover:scale-105"
                >
                  <ProcessStepCard {...step} />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 gap-6 justify-items-stretch">
            {processSteps.map((step: ProcessStepCardProps, index: number) => (
              <div
                key={step.step || index}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <ProcessStepCard {...step} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
