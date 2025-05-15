// Sidebar.tsx
import React from 'react';
import { Shield, ChevronRight, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SidebarItem from './sidebar/SidebarItem';
import * as LucideIcons from 'lucide-react';

// Function to dynamically get icon component based on name
const getIconComponent = (iconName: string) => {
  const Icon = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName];
  return Icon ? <Icon size={20} /> : null;
};

const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    sidebarOpen, 
    setSidebarOpen, 
    darkMode,
    allowedTabs
  } = useAppContext();
  
  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-primary-600'} text-white transition-all duration-300 h-screen ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 
          className={`font-bold text-xl flex items-center gap-2 ${!sidebarOpen && 'hidden'}`}
          aria-hidden={!sidebarOpen}
        >
          <Shield size={24} />
          AgriShield Pro
        </h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-primary-700'}`}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <nav className="mt-6" aria-label="Main navigation">
        {allowedTabs.map(tab => (
          <SidebarItem 
            key={tab.id}
            icon={getIconComponent(tab.icon)} 
            text={tab.text} 
            isActive={activeTab === tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            sidebarOpen={sidebarOpen}
            ariaLabel={tab.ariaLabel}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;