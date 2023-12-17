"use client";
import React, { FC } from "react";
import DatePicker from "react-datepicker";

interface YearPickerProps {
  value?: Date | null;
  onYearChange?: any;
}

const YearPicker: FC<YearPickerProps> = ({ onYearChange, value }) => {
  return (
    <DatePicker
      selected={value}
      showYearPicker
      dateFormat="yyyy"
      onChange={onYearChange}
      className="px-3 py-[13px] w-[80px] outline-none rounded-lg"
    />
  );
};

export default YearPicker;
