"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { baseInputStyles, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateType } from "@/constants/types/common.type";
import { DateFormat } from "@/constants/enums/commonEnum";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/lib/i18n";

type DateTimeRangePickerProps = {
  dateFrom: DateType;
  dateTo: DateType;
  onChange: (dateFrom: DateType, dateTo: DateType) => void;
};

export function DateTimeRangePicker({
  dateFrom,
  dateTo,
  onChange,
}: Readonly<DateTimeRangePickerProps>) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as "en" | "zh";
  const t = getTranslation(locale);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStartDate, setIsStartDate] = useState<boolean>(true);
  const [dateTime, setDateTime] = useState<{
    dateFrom: DateType | null;
    dateTo: DateType | null;
  }>({
    dateFrom: dateFrom ?? null,
    dateTo: dateTo ?? null,
  });
  const [errorDate, setErrorDate] = useState<string>("");

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
  const ampmOptions = ["AM", "PM"];

  const handleChangeCalendar = () => {
    setIsOpen(!isOpen);
    setDateTime({ dateFrom: dateFrom ?? null, dateTo: dateTo ?? null });
    setIsStartDate(true);
    setErrorDate("");
  };

  const handleDateSelect = (selectedDate: Dayjs | undefined) => {
    if (selectedDate) {
      const dateWithDefaultTime = selectedDate.startOf("day");
      setDateTime((prev) =>
        isStartDate
          ? { ...prev, dateFrom: dateWithDefaultTime }
          : { ...prev, dateTo: dateWithDefaultTime }
      );
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    setDateTime((prev) => {
      let newDate = isStartDate ? prev.dateFrom : prev.dateTo;

      if (!newDate) return prev;

      if (type === "hour") {
        newDate = newDate.hour(parseInt(value, 10));
      } else if (type === "minute") {
        newDate = newDate.minute(parseInt(value, 10));
      } else if (type === "ampm") {
        if (value === "AM" && newDate.hour() >= 12) {
          newDate = newDate.hour(newDate.hour() - 12);
        } else if (value === "PM" && newDate.hour() < 12) {
          newDate = newDate.hour(newDate.hour() + 12);
        }
      }

      return isStartDate
        ? { ...prev, dateFrom: newDate }
        : { ...prev, dateTo: newDate };
    });
  };

  const handleSubmit = () => {
    if (isStartDate) {
      setIsStartDate(false);
      setDateTime((prev) => ({
        ...prev,
        dateTo: null,
      }));
      return;
    }

    if (dateTime.dateFrom && !dateTime.dateTo) {
      setErrorDate("Please select an end date before submitting.");
      return;
    }

    if (dateTime.dateFrom && dateTime.dateTo) {
      if (dayjs(dateTime.dateTo).isBefore(dayjs(dateTime.dateFrom))) {
        setErrorDate("End date/time must be later than the start date/time.");
        return;
      }

      onChange(dateTime.dateFrom, dateTime.dateTo);
      setIsOpen(false);
      setIsStartDate(true);
      setErrorDate("");
    }
  };

  const handleClearDate = () => {
    setDateTime({
      dateFrom: null,
      dateTo: null,
    });

    onChange(null, null);
    setIsOpen(false);
    setIsStartDate(true);
    setErrorDate("");
  };

  useEffect(() => {
    setDateTime({
      dateFrom: dateFrom ?? null,
      dateTo: dateTo ?? null,
    });
  }, [dateFrom, dateTo]);

  return (
    <Popover open={isOpen} onOpenChange={handleChangeCalendar}>
      <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          baseInputStyles,
          "relative w-full justify-start text-left font-normal overflow-hidden truncate whitespace-nowrap",
          !(dateFrom && dateTo) && "text-muted-foreground"
        )}
        title={dateFrom && dateTo ? `${dateFrom.format(DateFormat.DEFAULT)} - ${dateTo.format(DateFormat.DEFAULT)}` : t.dateTimePlaceholder}
      >
        <CalendarIcon className="mr-1 text-gray-400 w-4 h-4 flex-shrink-0" />
        <span className="overflow-hidden truncate">{dateFrom && dateTo 
          ? `${dateFrom.format(DateFormat.DEFAULT)} - ${dateTo.format(DateFormat.DEFAULT)}`
          : t.dateTimePlaceholder}
        </span>
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex items-center justify-between w-full py-2 px-4">
          <h1 className="flex-1 font-bold">  
            {isStartDate ? "Select Start Date" : "Select End Date"}
          </h1>
          <Button variant="link" className="text-right" onClick={handleClearDate}>
            Clear
          </Button>
        </div>
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={(isStartDate
              ? dateTime.dateFrom
              : dateTime.dateTo
            )?.toDate()}
            onSelect={(date) => handleDateSelect(dayjs(date))}
            disabled={(date) => {
              return !isStartDate && dateTime.dateFrom 
                ? dayjs(date).isBefore(dayjs(dateTime.dateFrom)) 
                : false;
            }}
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            {/* Hours Selector */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.toReversed().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      ((isStartDate
                        ? dateTime.dateFrom
                        : dateTime.dateTo
                      )?.hour() ?? -1) %
                        12 ===
                      hour % 12
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* Minutes Selector */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      (isStartDate
                        ? dateTime.dateFrom
                        : dateTime.dateTo
                      )?.minute() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* AM/PM Selector */}
            <ScrollArea className="w-32 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {ampmOptions.map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      ((isStartDate
                        ? dateTime.dateFrom
                        : dateTime.dateTo
                      )?.hour() ?? -1) >= 12 === (ampm === "PM")
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        {errorDate && <p className="text-red-500 p-2">{errorDate}</p>}
        <div className="grid grid-cols-1 w-full p-2">
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
