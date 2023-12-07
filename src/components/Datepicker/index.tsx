import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Datepicker({ selected, setSelected }) {
  const isWeekend = (date: any) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight in local time zone

  return (
    <DayPicker
      weekStartsOn={0}
      locale={es}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={(date) => date.getTime() < today.getTime() || isWeekend(date)}
      formatters={{
        formatCaption: (date) => {
          const formattedMonth = format(date, "MMMM", { locale: es });
          return (
            formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1)
          );
        },
      }}
    />
  );
}
