"use client";

import { DateTimeRangePicker } from "@/components/common/DateTimeRangePicker";
import { StyledInput } from "@/components/common/StyledInput";
import StyledSelect from "@/components/common/StyledSelect";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { StyledLoading } from "@/components/common/StyledLoading";
import { ConfigEnum, DateFormat } from "@/constants/enums/commonEnum";
import { StyledPagination } from "@/components/common/StyledPagination";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useCategoryOptions } from "@/constants/options";
import { useLoading } from "@/stores/loading.store";
import { useNewsFilter } from "@/hooks/useNewsFilter";
import { fetchNews } from "../api/news";
import { StyledArticleCard } from "@/components/article/StyledArticleCard";
import { useFilterArticle } from "@/stores/filter.store";

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as "en" | "zh";
  const t = getTranslation(locale);

  const categoryOptions = useCategoryOptions();
  const { setLoading, openLoading } = useLoading();
  const { articleFilter, setArticleFilter } = useFilterArticle();
  const { pageData, setPageData, currentPage, setCurrentPage, handleDateChange } = useNewsFilter();

  const ITEMS_PER_PAGE = ConfigEnum.ITEMS_PER_PAGE;
  const totalPages = Math.ceil((pageData?.articles.length ?? 0) / ITEMS_PER_PAGE);

  const callViewApi = async () => {
    try {
      setLoading(true);
      const response = await fetchNews({
        q: articleFilter.search,
        category: articleFilter.category,
        from: articleFilter.dateFrom ? dayjs(articleFilter.dateFrom).format(DateFormat.ISO) : "",
        to: articleFilter.dateTo ? dayjs(articleFilter.dateTo).format(DateFormat.ISO) : "",
        lang: locale,
        max: ConfigEnum.MAX_ITEMS.toString(),
      });
      if (response) {
        setPageData(response);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      callViewApi();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleFilter]);

  const displayedArticles = pageData?.articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between mt-8 gap-4 md:gap-8 lg:gap-16">
        <StyledInput
          icon={Search}
          placeholder={t.searchPlaceholder}
          value={articleFilter.search}
          onChange={(e) => setArticleFilter({ ...articleFilter, search: e.target.value })}
        />
        <StyledSelect
          options={categoryOptions}
          placeholder={t.categories}
          value={articleFilter.category}
          onChange={(val) => setArticleFilter({ ...articleFilter, category: val === "none" ? "" : val })}
        />
        <DateTimeRangePicker
          dateFrom={articleFilter.dateFrom ? dayjs(articleFilter.dateFrom) : dayjs().startOf("day")}
          dateTo={articleFilter.dateTo ? dayjs(articleFilter.dateTo) : null}
          onChange={handleDateChange}
        />
      </div>
      {openLoading && (
        <div className="mt-24">
          <StyledLoading />
        </div>
      )}
      {!openLoading && (
        <>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {displayedArticles?.map((article, index) => (
                <StyledArticleCard
                  key={index + article.title}
                  image={article.image}
                  title={article.title}
                  description={article.description}
                  publishedAt={dayjs(article.publishedAt).format(DateFormat.SHORT_DATE_TIME)}
                  source={article.source}
                />
              ))}
            </div>
          </motion.div>
          <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
            {pageData && pageData.articles.length > 1 && (
              <StyledPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </footer>
        </>
      )}
    </>
  );
}
