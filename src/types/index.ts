// index.ts (types)
export * from './chart';

// User
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  district: string;
  profileImage?: string;
  permissions: string[];
  lastLogin: string;
}

// Product Database Types
export interface ProductDetail {
  activeIngredient?: string;
  composition?: string;
  packaging: string[];
  batchFormat?: string;
  commonCounterfeitMarkers?: string[];
  hologramFeatures?: string[];
  subsidizedRate?: number;
  mrp: Record<string, number>;
  bagColor?: string;
  varieties?: string[];
}

export interface CompanyProducts {
  [productName: string]: ProductDetail;
}

export interface CategoryCompanies {
  [companyName: string]: CompanyProducts;
}

export interface ProductDatabase {
  pesticides: CategoryCompanies;
  fertilizers: CategoryCompanies;
  seeds: CategoryCompanies;
}

// Workflow Types
export interface InspectionTask {
  id: string;
  officer: string;
  date: string;
  location: string;
  targetType: string;
  equipment: string[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  notes?: string;
  district?: string;
  subdivision?: string;
  retailerId?: string;
  distributorId?: string;
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
  inspectionTaskId?: string;
  officerId?: string;
  retailerId?: string;
  distributorId?: string;
  mfgDate?: string;
  expDate?: string;
  district?: string;
  subdivision?: string;
}

export interface LabSample extends Seizure {
  sampleType: string;
  labDestination: string;
  receivedBy?: string;
  receivedAt?: string;
  testingStartedAt?: string;
  testingCompletedAt?: string;
  labResults?: Record<string, any>;
  reportUrl?: string;
}

export interface FIRCase {
  id: string;
  labReportId: string;
  violationType: string;
  accused: string;
  location: string;
  status: string;
  filedBy?: string;
  filedAt?: string;
  caseNumber?: string;
  courtDate?: string;
  evidenceUrls?: string[];
  documents?: Record<string, string>;
  seizureId?: string;
  district?: string;
  policeStation?: string;
}

// Analytics Types
export interface OfficerPerformance {
  name: string;
  inspections: number;
  seizures: number;
  compliance: number;
  district: string;
  role: string;
}

export interface DistrictPerformance {
  district: string;
  inspections: number;
  violations: number;
  seizures: number;
  complianceRate: number;
  highRiskAreas: number;
}

export interface HighRiskArea {
  area: string;
  district: string;
  riskLevel: number;
  violations: number;
  lastInspection: string;
}

// Toast
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

// Navigation
export interface Tab {
  id: string;
  icon: string;
  text: string;
  ariaLabel: string;
  allowedRoles: string[];
}