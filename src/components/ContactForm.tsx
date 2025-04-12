
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContactFormProps {
  onSubmit: (email: string, phone: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setEmailError(isValid ? '' : 'Please enter a valid email address');
    return isValid;
  };
  
  const validatePhone = (phone: string): boolean => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const isValid = re.test(phone);
    setPhoneError(isValid ? '' : 'Please enter a valid phone number');
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    
    if (isEmailValid && isPhoneValid) {
      onSubmit(email, phone);
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-4 card-shadow animate-bounce-in">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={`w-full ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(123) 456-7890"
            className={`w-full ${phoneError ? 'border-red-500' : ''}`}
          />
          {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
        </div>
        
        <Button className="primary-button w-full" type="submit">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
