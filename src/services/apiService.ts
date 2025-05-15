// apiService.ts
import { Seizure, InspectionTask, LabSample, FIRCase } from '../context/AppContext';

// Mock API base URL
const API_BASE_URL = 'https://api.agrishieldpro.gov.in/v1';

// Common headers for API requests
const getHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Generic fetch wrapper with error handling
async function fetchWithAuth<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
      } catch {
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    // Check if response is empty
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Inspection Tasks API
export const inspectionTasksApi = {
  getAll: () => fetchWithAuth<InspectionTask[]>('/inspection-tasks'),
  
  getById: (id: string) => fetchWithAuth<InspectionTask>(`/inspection-tasks/${id}`),
  
  create: (task: Omit<InspectionTask, 'id' | 'status'>) => 
    fetchWithAuth<InspectionTask>('/inspection-tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }),
  
  update: (id: string, task: Partial<InspectionTask>) => 
    fetchWithAuth<InspectionTask>(`/inspection-tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(task),
    }),
  
  delete: (id: string) => 
    fetchWithAuth<void>(`/inspection-tasks/${id}`, {
      method: 'DELETE',
    }),
};

// Seizures API
export const seizuresApi = {
  getAll: () => fetchWithAuth<Seizure[]>('/seizures'),
  
  getById: (id: string) => fetchWithAuth<Seizure>(`/seizures/${id}`),
  
  create: (seizure: Omit<Seizure, 'id' | 'status'>) => 
    fetchWithAuth<Seizure>('/seizures', {
      method: 'POST',
      body: JSON.stringify(seizure),
    }),
  
  update: (id: string, seizure: Partial<Seizure>) => 
    fetchWithAuth<Seizure>(`/seizures/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(seizure),
    }),
  
  generateMemo: (id: string) => 
    fetchWithAuth<{ memoUrl: string }>(`/seizures/${id}/generate-memo`),
};

// Lab Samples API
export const labSamplesApi = {
  getAll: () => fetchWithAuth<LabSample[]>('/lab-samples'),
  
  getById: (id: string) => fetchWithAuth<LabSample>(`/lab-samples/${id}`),
  
  create: (sample: Omit<LabSample, 'id' | 'status'>) => 
    fetchWithAuth<LabSample>('/lab-samples', {
      method: 'POST',
      body: JSON.stringify(sample),
    }),
  
  updateStatus: (id: string, status: string, results?: Record<string, any>) => 
    fetchWithAuth<LabSample>(`/lab-samples/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, results }),
    }),
  
  uploadReport: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('report', file);
    
    return fetchWithAuth<{ reportUrl: string }>(`/lab-samples/${id}/report`, {
      method: 'POST',
      headers: {
        // Remove Content-Type so browser can set it with boundary for form-data
        'Content-Type': undefined as any,
      },
      body: formData,
    });
  },
};

// FIR Cases API
export const firCasesApi = {
  getAll: () => fetchWithAuth<FIRCase[]>('/fir-cases'),
  
  getById: (id: string) => fetchWithAuth<FIRCase>(`/fir-cases/${id}`),
  
  create: (firCase: Omit<FIRCase, 'id' | 'status'>) => 
    fetchWithAuth<FIRCase>('/fir-cases', {
      method: 'POST',
      body: JSON.stringify(firCase),
    }),
  
  update: (id: string, firCase: Partial<FIRCase>) => 
    fetchWithAuth<FIRCase>(`/fir-cases/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(firCase),
    }),
  
  submitToEFIRSystem: (id: string) => 
    fetchWithAuth<{ referenceNumber: string }>(`/fir-cases/${id}/submit-to-efir`),
  
  downloadDocument: (id: string, documentType: string) => 
    fetchWithAuth<{ documentUrl: string }>(`/fir-cases/${id}/documents/${documentType}`),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => fetchWithAuth<{
    inspections: number;
    seizures: number;
    labSamples: number;
    firCases: number;
    complianceRate: number;
  }>('/dashboard/stats'),
  
  getPerformanceData: (timeframe: 'weekly' | 'monthly' | 'quarterly' = 'monthly') => 
    fetchWithAuth<any[]>(`/dashboard/performance?timeframe=${timeframe}`),
  
  getOfficerPerformance: () => fetchWithAuth<any[]>('/dashboard/officer-performance'),
  
  getHotspotData: () => fetchWithAuth<any[]>('/dashboard/hotspots'),
};

// Reports API
export const reportsApi = {
  generate: (
    reportType: string, 
    params: Record<string, any> = {}, 
    format: 'pdf' | 'excel' = 'pdf'
  ) => 
    fetchWithAuth<{ reportUrl: string }>(
      `/reports/generate?type=${reportType}&format=${format}`, 
      {
        method: 'POST',
        body: JSON.stringify(params),
      }
    ),
  
  getAuditLogs: (
    startDate?: string, 
    endDate?: string, 
    userId?: string, 
    action?: string
  ) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (userId) params.append('userId', userId);
    if (action) params.append('action', action);
    
    return fetchWithAuth<any[]>(`/reports/audit-logs?${params.toString()}`);
  },
};

// Export all APIs
export default {
  inspectionTasks: inspectionTasksApi,
  seizures: seizuresApi,
  labSamples: labSamplesApi,
  firCases: firCasesApi,
  dashboard: dashboardApi,
  reports: reportsApi,
};