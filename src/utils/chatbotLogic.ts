
export type MessageType = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: string[];
};

export type ScheduleState = {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: string;
  reason: string;
  step: "greeting" | "name" | "contact" | "reason" | "date" | "time" | "confirmation" | "complete";
};

const initialState: ScheduleState = {
  name: "",
  email: "",
  phone: "",
  date: null,
  time: "",
  reason: "",
  step: "greeting",
};

// Returns messages based on current state
export const getResponseForState = (state: ScheduleState): MessageType => {
  const messageId = `msg-${Date.now()}`;
  
  switch (state.step) {
    case "greeting":
      return {
        id: messageId,
        text: "Hello! I'm your therapy scheduling assistant. I can help you book a session with our therapists. Would you like to schedule an appointment?",
        sender: "bot",
        options: ["Yes, I'd like to schedule", "Just browsing"],
      };
      
    case "name":
      return {
        id: messageId,
        text: "Great! Let's get started. What's your name?",
        sender: "bot",
      };
      
    case "contact":
      return {
        id: messageId,
        text: `Nice to meet you, ${state.name}! I'll need your email and phone number to confirm the appointment.`,
        sender: "bot",
      };
      
    case "reason":
      return {
        id: messageId,
        text: "Thank you. What's the primary reason for your visit?",
        sender: "bot",
        options: [
          "Anxiety",
          "Depression",
          "Relationship issues",
          "Stress management",
          "Trauma/PTSD",
          "Other"
        ],
      };
      
    case "date":
      return {
        id: messageId,
        text: "When would you like to schedule your appointment?",
        sender: "bot",
      };
      
    case "time":
      return {
        id: messageId,
        text: `What time works best for you on ${state.date ? state.date.toLocaleDateString() : "your selected date"}?`,
        sender: "bot",
      };
      
    case "confirmation":
      return {
        id: messageId,
        text: `Great! Please confirm your appointment details:
        
Name: ${state.name}
Email: ${state.email}
Phone: ${state.phone}
Date: ${state.date ? state.date.toLocaleDateString() : "Not selected"}
Time: ${state.time}
Reason: ${state.reason}

Is this information correct?`,
        sender: "bot",
        options: ["Confirm appointment", "Edit information"],
      };
      
    case "complete":
      return {
        id: messageId,
        text: `Thank you, ${state.name}! Your appointment has been scheduled successfully. You'll receive a confirmation email shortly.

If you need to reschedule or cancel, please contact us at least 24 hours before your appointment.

See you soon!`,
        sender: "bot",
      };
      
    default:
      return {
        id: messageId,
        text: "I'm sorry, I didn't understand that. Let's try again.",
        sender: "bot",
      };
  }
};

// Process user input and update state
export const processUserInput = (
  input: string,
  currentState: ScheduleState
): ScheduleState => {
  const newState = { ...currentState };
  
  switch (currentState.step) {
    case "greeting":
      if (input.toLowerCase().includes("yes") || 
          input.toLowerCase().includes("schedule")) {
        newState.step = "name";
      }
      break;
      
    case "name":
      newState.name = input.trim();
      newState.step = "contact";
      break;
      
    case "contact":
      // This would normally validate email and phone
      // For now we'll just move forward
      if (input.includes("@")) {
        newState.email = input.trim();
      } else if (input.match(/\d/)) {
        newState.phone = input.trim();
      }
      
      // Only proceed if both email and phone are provided
      if (newState.email && newState.phone) {
        newState.step = "reason";
      }
      break;
      
    case "reason":
      newState.reason = input.trim();
      newState.step = "date";
      break;
      
    case "time":
      newState.time = input.trim();
      newState.step = "confirmation";
      break;
      
    case "confirmation":
      if (input.toLowerCase().includes("confirm") || 
          input.toLowerCase().includes("yes") || 
          input.toLowerCase().includes("correct")) {
        newState.step = "complete";
      } else {
        // Reset to beginning of process
        newState.step = "name";
      }
      break;
      
    default:
      break;
  }
  
  return newState;
};

export const getInitialState = () => ({ ...initialState });
