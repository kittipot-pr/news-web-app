"use client";

import { useMemo } from "react";
import { Categories } from "./enums/commonEnum";

export function useCategoryOptions() {
  return useMemo(
    () => [
      { label: "None", value: "none" },
      ...Object.entries(Categories).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
        value,
      })),
    ],
    []
  );
}

export function useLanguageOptions() {
  return useMemo(
    () => [
      { label: "English", value: "en" },
      { label: "中文", value: "zh" },
    ],
    []
  );
}