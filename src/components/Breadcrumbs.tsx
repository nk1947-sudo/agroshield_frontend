// Breadcrumbs.tsx
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { darkMode } = useAppContext();
  
  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        <li className="flex items-center">
          <a 
            href="#"
            className={`flex items-center ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="Home"
          >
            <Home size={16} />
          </a>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight 
              size={16} 
              className={darkMode ? 'text-gray-500' : 'text-gray-400'} 
            />
            
            {index === items.length - 1 ? (
              <span 
                className={`ml-1 font-medium ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
                aria-current="page"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </span>
            ) : (
              <a 
                href={item.href || '#'}
                className={`ml-1 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;