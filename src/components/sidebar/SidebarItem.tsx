// SidebarItem.tsx
import React from 'react';
import { useAppContext } from '../../context/AppContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
  sidebarOpen: boolean;
  ariaLabel: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  isActive, 
  onClick, 
  sidebarOpen,
  ariaLabel
}) => {
  const { darkMode } = useAppContext();
  
  return (
    <button 
      className={`w-full text-left flex items-center p-3 cursor-pointer transition-colors ${
        isActive 
          ? darkMode ? 'bg-gray-700' : 'bg-primary-700' 
          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-primary-700'
      }`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      {sidebarOpen && <span className="ml-3">{text}</span>}
      {!sidebarOpen && (
        <span className="sr-only">{text}</span>
      )}
    </button>
  );
};

export default SidebarItem;