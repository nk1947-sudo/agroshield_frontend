// App.tsx
import React, { useEffect } from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardModule from './modules/DashboardModule';
import InspectionPlanningModule from './modules/InspectionPlanningModule';
import FieldExecutionModule from './modules/FieldExecutionModule';
import SeizureLoggingModule from './modules/SeizureLoggingModule';
import LegalModule from './modules/LegalModule';
import LabInterfaceModule from './modules/LabInterfaceModule';
import ReportAuditModule from './modules/ReportAuditModule';
import './App.css';

const Main: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    darkMode, 
    toggleDarkMode,
    toasts,
    removeToast,
    userRole,
    setUserRole,
    allowedTabs
  } = useAppContext();
  
  useEffect(() => {
    // Set initial tab to first allowed tab
    if (allowedTabs.length > 0 && !allowedTabs.find(tab => tab.id === activeTab)) {
      setActiveTab(allowedTabs[0].id);
    }
  }, [allowedTabs, activeTab, setActiveTab]);
  
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className={`${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-sm'} p-4`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {allowedTabs.find(tab => tab.id === activeTab)?.text || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              {/* Role Selector */}
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                aria-label="Select user role"
              >
                {Object.values({
                  FIELD_OFFICER: 'Field Officer',
                  DAO: 'District Agricultural Officer',
                  LEGAL_OFFICER: 'Legal Officer',
                  LAB_COORDINATOR: 'Lab Coordinator',
                  HQ_MONITORING: 'HQ Monitoring Cell',
                  DISTRICT_ADMIN: 'District Admin'
                }).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button 
                className={`p-2 rounded-full relative ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>
              
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full ${
                  darkMode ? 'bg-green-500' : 'bg-green-600'
                } flex items-center justify-center text-white font-semibold`}>
                  {userRole.split(' ').map(word => word[0]).join('')}
                </div>
                <span className="font-medium">{userRole}</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <ErrorBoundary>
            {activeTab === 'dashboard' && <DashboardModule />}
            {activeTab === 'inspection-planning' && <InspectionPlanningModule />}
            {activeTab === 'field-execution' && <FieldExecutionModule />}
            {activeTab === 'seizure-logging' && <SeizureLoggingModule />}
            {activeTab === 'legal-module' && <LegalModule />}
            {activeTab === 'lab-interface' && <LabInterfaceModule />}
            {activeTab === 'report-audit' && <ReportAuditModule />}
          </ErrorBoundary>
        </main>
        
        {/* Toast notifications */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          {toasts.map(toast => (
            <div 
              key={toast.id} 
              className={`p-4 rounded-lg shadow-lg flex justify-between items-center ${
                toast.type === 'success' ? 'bg-green-500' : 
                toast.type === 'error' ? 'bg-red-500' : 
                'bg-blue-500'
              } text-white`}
              role="alert"
            >
              <span>{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)} 
                className="ml-4 text-white"
                aria-label="Dismiss notification"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;