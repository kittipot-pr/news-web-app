import { Dayjs } from "dayjs";

export type FilterType = {
  search: string;
  category: string;
  dateFrom: DateType;
  dateTo: DateType;
}

export type Option = {
  label: string;
  value: string;
}

export type DateType = Dayjs | null;