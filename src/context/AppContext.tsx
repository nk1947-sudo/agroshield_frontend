// AppContext.tsx
import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

// User roles as per SOP
export const USER_ROLES = {
  FIELD_OFFICER: 'Field Officer',
  DAO: 'District Agricultural Officer',
  LEGAL_OFFICER: 'Legal Officer',
  LAB_COORDINATOR: 'Lab Coordinator',
  HQ_MONITORING: 'HQ Monitoring Cell',
  DISTRICT_ADMIN: 'District Admin'
};

// Define tabs according to SOP workflow
export const TABS = [
  { 
    id: 'dashboard', 
    icon: 'BarChart3', 
    text: 'Dashboard',
    ariaLabel: 'View monitoring dashboard',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN]
  },
  { 
    id: 'inspection-planning', 
    icon: 'Calendar', 
    text: 'Inspection Planning',
    ariaLabel: 'Plan inspection visits',
    allowedRoles: [USER_ROLES.DISTRICT_ADMIN, USER_ROLES.DAO]
  },
  { 
    id: 'field-execution', 
    icon: 'Camera', 
    text: 'Field Execution',
    ariaLabel: 'Execute field inspections',
    allowedRoles: [USER_ROLES.FIELD_OFFICER, USER_ROLES.DAO]
  },
  { 
    id: 'seizure-logging', 
    icon: 'Package', 
    text: 'Seizure Logging',
    ariaLabel: 'Log seized items',
    allowedRoles: [USER_ROLES.FIELD_OFFICER, USER_ROLES.DAO]
  },
  { 
    id: 'legal-module', 
    icon: 'Scale', 
    text: 'Legal Module',
    ariaLabel: 'Legal enforcement',
    allowedRoles: [USER_ROLES.LEGAL_OFFICER, USER_ROLES.DAO]
  },
  { 
    id: 'lab-interface', 
    icon: 'Building', 
    text: 'Lab Interface',
    ariaLabel: 'Lab sample tracking',
    allowedRoles: [USER_ROLES.LAB_COORDINATOR, USER_ROLES.DAO]
  },
  { 
    id: 'report-audit', 
    icon: 'FileSearch', 
    text: 'Reports & Audit',
    ariaLabel: 'View reports and audit logs',
    allowedRoles: [USER_ROLES.HQ_MONITORING, USER_ROLES.DAO, USER_ROLES.DISTRICT_ADMIN]
  }
];

// Product Database
export const PRODUCT_DATABASE = {
  pesticides: {
    'UPL': {
      'Saaf': {
        activeIngredient: 'Carbendazim 12% + Mancozeb 63%',
        packaging: ['100g', '250g', '500g'],
        batchFormat: 'UPL-SAAF-YYYYMM-XXXXX',
        commonCounterfeitMarkers: ['Poor print quality', 'Wrong shade of green', 'Missing hologram'],
        mrp: { '100g': 120, '250g': 280, '500g': 520 }
      },
      'Ulala': {
        activeIngredient: 'Flonicamid 50% WG',
        packaging: ['100g', '500g'],
        batchFormat: 'UPL-ULA-YYYYMM-XXXXX',
        mrp: { '100g': 650, '500g': 3100 }
      },
      'Curacron': {
        activeIngredient: 'Profenofos 50% EC',
        packaging: ['250ml', '500ml', '1L'],
        mrp: { '250ml': 480, '500ml': 940, '1L': 1850 }
      }
    },
    'Bayer': {
      'Confidor': {
        activeIngredient: 'Imidacloprid 17.8% SL',
        packaging: ['50ml', '100ml', '250ml', '500ml'],
        hologramFeatures: ['3D hologram', 'Color-changing ink', 'Microtext'],
        mrp: { '50ml': 165, '100ml': 320, '250ml': 785, '500ml': 1550 }
      },
      'Nativo': {
        activeIngredient: 'Tebuconazole 50% + Trifloxystrobin 25%',
        packaging: ['50g', '100g', '200g'],
        mrp: { '50g': 570, '100g': 1120, '200g': 2200 }
      }
    },
    'Syngenta': {
      'Karate': {
        activeIngredient: 'Lambda Cyhalothrin 5% EC',
        packaging: ['100ml', '250ml', '500ml'],
        mrp: { '100ml': 310, '250ml': 750, '500ml': 1480 }
      },
      'Ridomil Gold': {
        activeIngredient: 'Metalaxyl-M 4% + Mancozeb 64%',
        packaging: ['250g', '500g', '1kg'],
        mrp: { '250g': 590, '500g': 1160, '1kg': 2280 }
      }
    }
  },
  fertilizers: {
    'IFFCO': {
      'DAP': {
        composition: '18-46-0',
        packaging: ['50kg'],
        bagColor: 'Green with IFFCO logo',
        subsidizedRate: 1350,
        mrp: 1350
      },
      'NPK 10:26:26': {
        composition: '10-26-26',
        packaging: ['50kg'],
        subsidizedRate: 1470,
        mrp: 1470
      }
    },
    'Coromandel': {
      'Gromor': {
        composition: '14-35-14',
        packaging: ['50kg'],
        bagColor: 'White with green stripes',
        mrp: 1520
      }
    }
  },
  seeds: {
    'Mahyco': {
      'Bt Cotton': {
        varieties: ['MECH-162', 'MECH-184'],
        packaging: ['450g'],
        mrp: { '450g': 930 }
      }
    },
    'Nuziveedu': {
      'Cotton Hybrid': {
        varieties: ['Bhakti', 'Mallika'],
        packaging: ['475g'],
        mrp: { '475g': 980 }
      }
    }
  }
};

// Define types
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface Tab {
  id: string;
  icon: string;
  text: string;
  ariaLabel: string;
  allowedRoles: string[];
}

export interface InspectionTask {
  id: string;
  officer: string;
  date: string;
  location: string;
  targetType: string;
  equipment: string[];
  status: string;
}

export interface Seizure {
  id: string;
  company: string;
  product: string;
  batchNumber: string;
  authenticityScore: number;
  issues: string[];
  recommendation: string;
  geoLocation: string;
  timestamp: string;
  quantity?: string;
  estimatedValue?: string;
  witnessName?: string;
  evidencePhotos?: string[];
  videoEvidence?: string;
  status: string;
}

export interface LabSample extends Seizure {
  sampleType: string;
  labDestination: string;
}

export interface FIRCase {
  id: string;
  labReportId: string;
  violationType: string;
  accused: string;
  location: string;
  status: string;
}

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  allowedTabs: Tab[];
  inspectionTasks: InspectionTask[];
  addInspectionTask: (task: Omit<InspectionTask, 'id' | 'status'>) => void;
  seizures: Seizure[];
  addSeizure: (seizure: Omit<Seizure, 'id' | 'status'>) => void;
  labSamples: LabSample[];
  addLabSample: (sample: Omit<LabSample, 'id' | 'status'>) => void;
  firCases: FIRCase[];
  addFIRCase: (firCase: Omit<FIRCase, 'id' | 'status'>) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [userRole, setUserRole] = useState(USER_ROLES.DAO);
  const [inspectionTasks, setInspectionTasks] = useState<InspectionTask[]>([]);
  const [seizures, setSeizures] = useState<Seizure[]>([]);
  const [labSamples, setLabSamples] = useState<LabSample[]>([]);
  const [firCases, setFIRCases] = useState<FIRCase[]>([]);

  // Add inspection task
  const addInspectionTask = useCallback((task: Omit<InspectionTask, 'id' | 'status'>) => {
    setInspectionTasks(prev => [...prev, { ...task, id: `INS-${Date.now()}`, status: 'scheduled' }]);
  }, []);

  // Add seizure
  const addSeizure = useCallback((seizure: Omit<Seizure, 'id' | 'status'>) => {
    setSeizures(prev => [...prev, { ...seizure, id: `SEZ-${Date.now()}`, status: 'pending' }]);
  }, []);

  // Add lab sample
  const addLabSample = useCallback((sample: Omit<LabSample, 'id' | 'status'>) => {
    setLabSamples(prev => [...prev, { ...sample, id: `LAB-${Date.now()}`, status: 'in-transit' }]);
  }, []);

  // Add FIR case
  const addFIRCase = useCallback((firCase: Omit<FIRCase, 'id' | 'status'>) => {
    setFIRCases(prev => [...prev, { ...firCase, id: `FIR-${Date.now()}`, status: 'draft' }]);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Toast notification system
  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Get allowed tabs based on user role
  const allowedTabs = useMemo(() => {
    return TABS.filter(tab => tab.allowedRoles.includes(userRole));
  }, [userRole]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    darkMode,
    toggleDarkMode,
    toasts,
    addToast,
    removeToast,
    userRole,
    setUserRole,
    allowedTabs,
    inspectionTasks,
    addInspectionTask,
    seizures,
    addSeizure,
    labSamples,
    addLabSample,
    firCases,
    addFIRCase
  }), [
    activeTab, 
    sidebarOpen, 
    darkMode, 
    toggleDarkMode, 
    toasts, 
    addToast, 
    removeToast,
    userRole,
    allowedTabs,
    inspectionTasks,
    addInspectionTask,
    seizures,
    addSeizure,
    labSamples,
    addLabSample,
    firCases,
    addFIRCase
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for accessing app context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};