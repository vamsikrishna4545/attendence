import React from 'react';

const Button = ({ children, className = '' }) => {
  return (
    <button className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${className}`}>
      {children}
    </button>
  );
};

export { Button };
