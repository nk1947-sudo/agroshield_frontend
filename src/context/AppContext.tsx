import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { Toast } from '../types';

// Define user roles
export const USER_ROLES = {
  FIELD_OFFICER: 'Field Officer',
  DAO: 'District Agricultural Officer',
  LEGAL_OFFICER: 'Legal Officer',
  LAB_COORDINATOR: 'Lab Coordinator',
  HQ_MONITORING: 'HQ Monitoring Cell',
  DISTRICT_ADMIN: 'District Admin',
};

// App context interface
export interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userRole: string;
  setUserRole: (role: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  seizures: any[];
  addSeizure: (seizure: any) => void;
  labSamples: any[];
  addLabSample: (sample: any) => void;
  firCases: any[];
  addFIRCase: (firCase: any) => void;
  inspectionTasks: any[];
  addInspectionTask: (task: any) => void;
  toasts: Toast[];
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState(USER_ROLES.DAO);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seizures, setSeizures] = useState([
    { id: 'SEZ-001', product: 'Saaf Fungicide', location: 'Kolhapur Market', quantity: 25, status: 'pending', batchNumber: 'UPL-2023-45' },
    { id: 'SEZ-002', product: 'Glyphosate 41%', location: 'Sangli Warehouse', quantity: 100, status: 'processing', batchNumber: 'DWC-2023-56' }
  ]);
  const [labSamples, setLabSamples] = useState([
    { id: 'LAB-001', product: 'Saaf Fungicide', status: 'in-transit', sampleType: 'Liquid', labDestination: 'SPTL Ghaziabad' },
    { id: 'LAB-002', product: 'Glyphosate 41%', status: 'received', sampleType: 'Powder', labDestination: 'NABL Mumbai' }
  ]);
  const [firCases, setFirCases] = useState([
    { id: 'FIR-001', labReportId: 'LAB-001', status: 'draft', violationType: 'Counterfeit Product' },
    { id: 'FIR-002', labReportId: 'LAB-002', status: 'submitted', violationType: 'Adulteration' }
  ]);
  const [inspectionTasks, setInspectionTasks] = useState([
    { id: 'INS-001', officer: 'Ram Kumar', date: '2023-04-10', location: 'Kolhapur Market', status: 'completed' },
    { id: 'INS-002', officer: 'Priya Sharma', date: '2023-04-12', location: 'Sangli Warehouse', status: 'pending' }
  ]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);
  
  const addSeizure = (seizure: any) => {
    setSeizures((prev) => [...prev, { ...seizure, id: `SEZ-${Date.now().toString().slice(-4)}` }]);
  };

  const addLabSample = (sample: any) => {
    setLabSamples((prev) => [...prev, { ...sample, id: `LAB-${Date.now().toString().slice(-4)}` }]);
  };

  const addFIRCase = (firCase: any) => {
    setFirCases((prev) => [...prev, { ...firCase, id: `FIR-${Date.now().toString().slice(-4)}`, status: 'draft' }]);
  };

  const addInspectionTask = (task: any) => {
    setInspectionTasks((prev) => [...prev, { ...task, id: `INS-${Date.now().toString().slice(-4)}`, status: 'pending' }]);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const contextValue = useMemo(() => ({
    darkMode,
    toggleDarkMode,
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    seizures,
    addSeizure,
    labSamples,
    addLabSample,
    firCases,
    addFIRCase,
    inspectionTasks,
    addInspectionTask,
    toasts,
    addToast
  }), [darkMode, userRole, activeTab, seizures, labSamples, firCases, inspectionTasks, toasts]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
