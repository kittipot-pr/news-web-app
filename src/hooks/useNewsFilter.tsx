import { useState } from "react";
import dayjs from "dayjs";
import { DateType } from "@/constants/types/common.type";
import { ArticleResData } from "@/constants/types/article.type";
import { useFilterArticle } from "@/stores/filter.store";

export function useNewsFilter(initialData?: ArticleResData) {
  const [pageData, setPageData] = useState<ArticleResData | undefined>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { articleFilter, setArticleFilter } = useFilterArticle();

  const handleDateChange = (dateFrom: DateType, dateTo: DateType) => {
    setArticleFilter({
      ...articleFilter,
      dateFrom: dateFrom ? dayjs(dateFrom) : null,
      dateTo: dateTo ? dayjs(dateTo) : null,
    });
  };

  return { pageData, setPageData, currentPage, setCurrentPage, handleDateChange };
}
