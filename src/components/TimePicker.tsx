
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TimePickerProps {
  onSelectTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleSubmit = () => {
    if (selectedTime) {
      onSelectTime(selectedTime);
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-4 card-shadow animate-bounce-in">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Available Times</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {timeSlots.map((time) => (
          <button
            key={time}
            className={`p-3 rounded-lg border transition-all ${
              selectedTime === time
                ? 'bg-therapeutic-500 text-white border-therapeutic-500'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-therapeutic-50'
            }`}
            onClick={() => handleTimeSelection(time)}
          >
            {time}
          </button>
        ))}
      </div>
      <Button
        className="primary-button w-full"
        disabled={!selectedTime}
        onClick={handleSubmit}
      >
        Confirm Time
      </Button>
    </div>
  );
};

export default TimePicker;
