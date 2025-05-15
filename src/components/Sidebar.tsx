import React, { useState } from 'react';
import SidebarItem from './sidebar/SidebarItem';

const Sidebar = ({ tabs, activeTab, setActiveTab }) => {
  const [search, setSearch] = useState('');
  const filteredTabs = tabs.filter(tab =>
    tab.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <input
        type="text"
        placeholder="Search modules..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-2 px-2 py-1 rounded border"
        aria-label="Search modules"
      />
      <nav>
        {filteredTabs.map(tab => (
          <SidebarItem
            key={tab.id}
            icon={tab.icon}
            text={tab.text}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            ariaLabel={tab.text}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;