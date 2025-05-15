// StatCard.tsx
import React, { ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
  icon: ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  color = 'blue', 
  icon 
}) => {
  const { darkMode } = useAppContext();
  
  const colorMap = {
    blue: {
      light: 'text-blue-600',
      dark: 'text-blue-400',
      bg: darkMode ? 'bg-blue-900' : 'bg-blue-100'
    },
    red: {
      light: 'text-red-600',
      dark: 'text-red-400',
      bg: darkMode ? 'bg-red-900' : 'bg-red-100'
    },
    green: {
      light: 'text-green-600',
      dark: 'text-green-400',
      bg: darkMode ? 'bg-green-900' : 'bg-green-100'
    },
    yellow: {
      light: 'text-yellow-600',
      dark: 'text-yellow-400',
      bg: darkMode ? 'bg-yellow-900' : 'bg-yellow-100'
    },
    purple: {
      light: 'text-purple-600',
      dark: 'text-purple-400',
      bg: darkMode ? 'bg-purple-900' : 'bg-purple-100'
    }
  };
  
  const textColor = darkMode ? colorMap[color].dark : colorMap[color].light;
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 md:p-6 rounded-lg shadow relative w-full h-full animate-fade-in`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        <div className="mb-2 sm:mb-0">
          <h3 className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} text-sm font-medium`}>{title}</h3>
          <p className={`${textColor} text-3xl font-bold mt-1`}>{value}</p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>{trend}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color].bg} order-first sm:order-last mb-2 sm:mb-0`}>
          {React.cloneElement(icon as React.ReactElement, { className: textColor })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;