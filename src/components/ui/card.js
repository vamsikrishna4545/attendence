import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
};

export { Card, CardContent };
