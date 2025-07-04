import React, { useState } from 'react';

const Select = ({ children }) => {
  return (
    <div className="relative w-full">
      {children}
    </div>
  );
};

const SelectTrigger = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 bg-white border rounded-md ${className}`}
      >
        {children}
      </button>
      {isOpen && <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-md shadow-md z-10">
        {children}
      </div>}
    </div>
  );
};

const SelectContent = ({ children }) => {
  return (
    <div className="max-h-60 overflow-auto">
      {children}
    </div>
  );
};

const SelectItem = ({ children, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem };
