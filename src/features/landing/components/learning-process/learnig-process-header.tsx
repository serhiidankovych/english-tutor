import TextType from "@/components/text-type";
import { useTranslations } from "next-intl";

export const LearningProcessSectionHeader = () => {
  const t = useTranslations("LearningProcess");
  const englishFor = t.raw("englishFor");

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
      {t("header")}
      <span className="inline-block">
        <TextType
          text={englishFor}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
          className="text-primary"
        />
      </span>
    </h1>
  );
};
