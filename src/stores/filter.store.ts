import { FilterType } from "@/constants/types/common.type";
import { create } from "zustand";

interface FilterArticleStore {
  setArticleFilter: (state: FilterType) => void;
  articleFilter: FilterType;
}

export const useFilterArticle = create<FilterArticleStore>((set) => ({
  setArticleFilter: (value) => set((state) => ({ ...state, articleFilter: { ...state.articleFilter, ...value } })),
  articleFilter: {
    search: "",
    category: "",
    dateFrom: null,
    dateTo: null
  },
}));
