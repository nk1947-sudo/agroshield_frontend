// SkeletonCard.tsx
import React from 'react';
import { useAppContext } from '../context/AppContext';

interface SkeletonCardProps {
  rows?: number;
  withHeader?: boolean;
  withFooter?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  rows = 3,
  withHeader = true,
  withFooter = false,
  className = ''
}) => {
  const { darkMode } = useAppContext();
  
  const headerClass = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  const bodyClass = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  
  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm animate-pulse ${className}`}
      aria-hidden="true"
    >
      {withHeader && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg ${headerClass}`}></div>
              <div>
                <div className={`h-5 w-32 ${headerClass} rounded`}></div>
                <div className={`h-3 w-24 ${headerClass} rounded mt-2`}></div>
              </div>
            </div>
            
            <div className={`h-8 w-20 ${headerClass} rounded`}></div>
          </div>
        </div>
      )}
      
      <div className="p-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div 
            key={index} 
            className={`h-4 ${bodyClass} rounded ${index !== rows - 1 ? 'mb-3' : ''} ${
              index % 3 === 0 ? 'w-full' : index % 3 === 1 ? 'w-3/4' : 'w-1/2'
            }`}
          ></div>
        ))}
        
        {withFooter && (
          <div className="mt-4 pt-3 border-t border-gray-700 flex justify-end">
            <div className={`h-8 w-16 ${bodyClass} rounded mr-2`}></div>
            <div className={`h-8 w-20 ${bodyClass} rounded`}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonCard;