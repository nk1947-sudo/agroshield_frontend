import React from 'react';
import { Link } from 'react-router-dom'; // React Router Link for navigation
import { useAppContext } from '../../context/AppContext'; 

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
  ariaLabel: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive, onClick, ariaLabel }) => {
  const { darkMode } = useAppContext(); // Using context to handle dark mode

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-full text-left flex items-center p-3 cursor-pointer ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="ml-3">{text}</span>
    </button>
  );
};

export default SidebarItem;
