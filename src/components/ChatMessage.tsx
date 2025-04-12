
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageType } from '../utils/chatbotLogic';
import { UserRound } from 'lucide-react';

interface ChatMessageProps {
  message: MessageType;
  onOptionClick?: (option: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={isBot ? "message-container-bot" : "message-container-user"}>
      {isBot && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-therapeutic-200 text-therapeutic-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={isBot ? "chat-bubble-bot" : "chat-bubble-user"}>
        <div className="whitespace-pre-line">{message.text}</div>
        
        {isBot && message.options && message.options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.options.map((option) => (
              <button
                key={option}
                className="option-button"
                onClick={() => onOptionClick && onOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {!isBot && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarFallback className="bg-therapeutic-600 text-white">
            <UserRound size={16} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
