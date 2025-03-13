import { ArticleParamType } from "@/constants/types/article.type";
import { fetchData } from "../api/instance";

export const fetchNews = async (params: ArticleParamType) => {
  try {
    return await fetchData("/top-headlines", { ...params, sortby: "publishedAt" });
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};
