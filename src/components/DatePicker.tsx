
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarCheck } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onSubmit: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, onSubmit }) => {
  const today = new Date();
  const [hovering, setHovering] = useState(false);
  
  // Set up date boundaries (can't schedule in the past, only up to 3 months ahead)
  const fromDate = today;
  const toDate = new Date();
  toDate.setMonth(today.getMonth() + 3);
  
  return (
    <motion.div 
      className="bg-white rounded-xl p-4 card-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-800">Select a Date</h3>
        {selectedDate && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-therapeutic-50 text-therapeutic-500 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
          >
            <CalendarCheck size={16} />
            <span>{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </motion.div>
        )}
      </div>
      
      <div className="border rounded-lg bg-white overflow-hidden">
        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={onDateChange}
          fromDate={fromDate}
          toDate={toDate}
          className="p-2 bg-white"
          classNames={{
            day_selected: "bg-therapeutic-500 text-white hover:bg-therapeutic-600",
            day_today: "bg-therapeutic-100 text-therapeutic-800 font-bold",
            day: "hover:bg-therapeutic-50 transition-colors",
          }}
        />
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4"
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      >
        <Button 
          className={`primary-button w-full flex items-center justify-center gap-2 ${selectedDate ? 'bg-therapeutic-500' : 'bg-gray-300'}`}
          onClick={onSubmit} 
          disabled={!selectedDate}
        >
          <motion.span
            animate={{ x: hovering && selectedDate ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Confirm Date
          </motion.span>
          {selectedDate && hovering && (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
            >
              →
            </motion.span>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DatePicker;
