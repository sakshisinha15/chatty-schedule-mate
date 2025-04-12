
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onSubmit: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, onSubmit }) => {
  const today = new Date();
  // Set up date boundaries (can't schedule in the past, only up to 3 months ahead)
  const fromDate = today;
  const toDate = new Date();
  toDate.setMonth(today.getMonth() + 3);
  
  return (
    <div className="bg-white rounded-xl p-4 card-shadow animate-bounce-in">
      <Calendar
        mode="single"
        selected={selectedDate || undefined}
        onSelect={onDateChange}
        fromDate={fromDate}
        toDate={toDate}
        className="border rounded-lg p-2 bg-white"
        classNames={{
          day_selected: "bg-therapeutic-500 text-white hover:bg-therapeutic-600",
          day_today: "bg-therapeutic-100 text-therapeutic-800",
        }}
      />
      <Button 
        className="primary-button mt-4 w-full"
        onClick={onSubmit} 
        disabled={!selectedDate}
      >
        Confirm Date
      </Button>
    </div>
  );
};

export default DatePicker;
