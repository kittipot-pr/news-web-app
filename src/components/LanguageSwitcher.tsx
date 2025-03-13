"use client";

import { usePathname, useRouter } from "next/navigation";
import StyledSelect from "@/components/common/StyledSelect";
import { getTranslation } from "@/lib/i18n";
import { useLanguageOptions } from "@/constants/options";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] as "en" | "zh";
  const t = getTranslation(locale);

  const languageOptions = useLanguageOptions();

  const currentLang = pathname.split("/")[1];

  const setSelectedLanguage = (lang: string) => {
    const newPath = `/${lang}${pathname.slice(3)}`;
    router.push(newPath);
  };

  return (
    <StyledSelect
      options={languageOptions}
      placeholder={t.chooseLanguage}
      value={currentLang}
      onChange={setSelectedLanguage}
    />
  );
}