
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import ContactForm from './ContactForm';
import { useToast } from '@/components/ui/use-toast';
import { SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  MessageType, 
  ScheduleState,
  getInitialState, 
  getResponseForState,
  processUserInput 
} from '../utils/chatbotLogic';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [state, setState] = useState<ScheduleState>(getInitialState());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize chat with greeting
  useEffect(() => {
    const initialMessage = getResponseForState(state);
    setMessages([initialMessage]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: MessageType) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() && !showDatePicker && !showTimePicker && !showContactForm) return;
    
    // Add user message to chat
    addMessage({
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
    });
    
    setInput('');
    setIsLoading(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const newState = processUserInput(input, state);
      setState(newState);
      
      // Determine which component to show
      if (newState.step === 'date') {
        setShowDatePicker(true);
      } else if (newState.step === 'time') {
        setShowTimePicker(true);
      } else if (newState.step === 'contact' && (!newState.email || !newState.phone)) {
        setShowContactForm(true);
      } else {
        // Get bot response and add to messages
        const botResponse = getResponseForState(newState);
        addMessage(botResponse);
      }
      
      setIsLoading(false);
    }, 700);
  };

  const handleOptionClick = (option: string) => {
    setInput(option);
    handleSendMessage();
  };

  const handleDateSubmit = (date: Date | null) => {
    if (date) {
      setState(prev => ({ ...prev, date }));
      setShowDatePicker(false);
      
      // Add a user message showing the selected date
      addMessage({
        id: `user-${Date.now()}`,
        text: `I'd like to schedule on ${date.toLocaleDateString()}`,
        sender: 'user',
      });
      
      // Move to next step (time selection)
      const newState = { ...state, date, step: 'time' as const };
      setState(newState);
      
      // Show time picker
      setShowTimePicker(true);
      
      // Show a toast notification
      toast({
        title: "Date selected",
        description: `You've selected ${date.toLocaleDateString()}`,
      });
    }
  };

  const handleTimeSubmit = (time: string) => {
    setState(prev => ({ ...prev, time, step: 'confirmation' as const }));
    setShowTimePicker(false);
    
    // Add a user message showing the selected time
    addMessage({
      id: `user-${Date.now()}`,
      text: `I'd like the appointment at ${time}`,
      sender: 'user',
    });
    
    // Add bot confirmation message
    setTimeout(() => {
      const botResponse = getResponseForState({ 
        ...state, 
        time, 
        step: 'confirmation' as const
      });
      addMessage(botResponse);
      
      // Show a toast notification
      toast({
        title: "Time selected",
        description: `You've selected ${time}`,
      });
    }, 700);
  };

  const handleContactSubmit = (email: string, phone: string) => {
    setState(prev => ({ ...prev, email, phone, step: 'reason' as const }));
    setShowContactForm(false);
    
    // Add a user message with the contact info
    addMessage({
      id: `user-${Date.now()}`,
      text: `My email is ${email} and my phone is ${phone}`,
      sender: 'user',
    });
    
    // Add bot message asking for reason
    setTimeout(() => {
      const botResponse = getResponseForState({ 
        ...state, 
        email, 
        phone, 
        step: 'reason' as const
      });
      addMessage(botResponse);
      
      // Show a toast notification
      toast({
        title: "Contact information saved",
        description: "Your email and phone number have been recorded.",
      });
    }, 700);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onOptionClick={handleOptionClick} 
          />
        ))}
        
        {showDatePicker && (
          <div className="message-container-bot">
            <DatePicker 
              selectedDate={state.date}
              onDateChange={date => setState(prev => ({ ...prev, date }))}
              onSubmit={() => handleDateSubmit(state.date)}
            />
          </div>
        )}
        
        {showTimePicker && (
          <div className="message-container-bot">
            <TimePicker onSelectTime={handleTimeSubmit} />
          </div>
        )}
        
        {showContactForm && (
          <div className="message-container-bot">
            <ContactForm onSubmit={handleContactSubmit} />
          </div>
        )}
        
        {isLoading && (
          <div className="message-container-bot">
            <div className="chat-bubble-bot flex space-x-2">
              <div className="w-2 h-2 bg-therapeutic-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-therapeutic-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-therapeutic-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={showDatePicker || showTimePicker || showContactForm || isLoading}
          />
          <Button 
            type="submit" 
            className="bg-therapeutic-500 text-white hover:bg-therapeutic-600"
            disabled={!input.trim() || showDatePicker || showTimePicker || showContactForm || isLoading}
          >
            <SendIcon size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
