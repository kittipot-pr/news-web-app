import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseInputStyles = "text-[12px] sm:text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-gray-900 dark:border-gray-700";