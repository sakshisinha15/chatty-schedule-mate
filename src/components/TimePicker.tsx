
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';

interface TimePickerProps {
  onSelectTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  
  // Morning and afternoon time slots
  const morningSlots = ['9:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonSlots = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleSubmit = () => {
    if (selectedTime) {
      onSelectTime(selectedTime);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl p-4 card-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Available Times</h3>
        <div className="text-therapeutic-500 flex items-center gap-1">
          <Clock size={16} />
          <span className="text-sm">Select a time</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm text-gray-500 mb-2 font-medium">Morning</h4>
        <motion.div 
          className="grid grid-cols-3 gap-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {morningSlots.map((time) => (
            <motion.button
              key={time}
              variants={item}
              className={`p-3 rounded-lg border transition-all relative ${
                selectedTime === time
                  ? 'bg-therapeutic-500 text-white border-therapeutic-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-therapeutic-50'
              }`}
              onClick={() => handleTimeSelection(time)}
            >
              {time}
              {selectedTime === time && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-therapeutic-600 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={12} className="text-white" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm text-gray-500 mb-2 font-medium">Afternoon</h4>
        <motion.div 
          className="grid grid-cols-2 gap-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {afternoonSlots.map((time) => (
            <motion.button
              key={time}
              variants={item}
              className={`p-3 rounded-lg border transition-all relative ${
                selectedTime === time
                  ? 'bg-therapeutic-500 text-white border-therapeutic-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-therapeutic-50'
              }`}
              onClick={() => handleTimeSelection(time)}
            >
              {time}
              {selectedTime === time && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-therapeutic-600 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={12} className="text-white" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      >
        <Button
          className="primary-button w-full flex items-center justify-center gap-2"
          disabled={!selectedTime}
          onClick={handleSubmit}
        >
          <motion.span
            animate={{ x: hovering && selectedTime ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Confirm Time
          </motion.span>
          {selectedTime && hovering && (
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

export default TimePicker;
