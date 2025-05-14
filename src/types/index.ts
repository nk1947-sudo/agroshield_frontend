// This file exports TypeScript types and interfaces used throughout the application, ensuring type safety for props and state management.

export interface Product {
  activeIngredient?: string;
  packaging: string[];
  batchFormat?: string;
  commonCounterfeitMarkers?: string[];
  hologramFeatures?: string[];
  mrp: Record<string, number>;
  composition?: string;
  bagColor?: string;
  varieties?: string[];
}

export interface UserRole {
  FIELD_OFFICER: string;
  DAO: string;
  LEGAL_OFFICER: string;
  LAB_COORDINATOR: string;
  HQ_MONITORING: string;
  DISTRICT_ADMIN: string;
}

export interface Tab {
  id: string;
  icon: React.ReactNode;
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
  product: string;
  quantity: number;
  status: string;
}

export interface LabSample {
  id: string;
  sampleId: string;
  status: string;
}

export interface FIRCase {
  id: string;
  caseNumber: string;
  status: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}