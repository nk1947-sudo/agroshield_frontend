// DataCard.tsx
import React, { ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';

interface DataCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  actionButton,
  className = ''
}) => {
  const { darkMode } = useAppContext();
  
  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm ${className}`}
    >
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon && (
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {icon}
              </div>
            )}
            <div>
              <h3 className={`font-semibold ${icon ? 'text-lg' : 'text-xl'}`}>{title}</h3>
              {subtitle && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {actionButton && (
            <button 
              onClick={actionButton.onClick}
              className={`px-3 py-1.5 text-sm rounded font-medium ${
                darkMode 
                  ? 'bg-green-800 text-green-100 hover:bg-green-700' 
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {actionButton.label}
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DataCard;