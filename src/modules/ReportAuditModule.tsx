// ReportAuditModule.tsx
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ReportAuditModule: React.FC = () => {
  const { darkMode, addToast } = useAppContext();
  const [selectedReport, setSelectedReport] = useState<string>('daily');
  
  const handleGenerateReport = (reportType: string) => {
    addToast(`Generating ${reportType} report...`, 'info');
    // Report generation logic
  };
  
  const handleExportData = (format: string) => {
    addToast(`Exporting data in ${format} format...`, 'info');
    // Export logic
  };
  
  const reports = {
    daily: {
      title: 'Daily Activity Report',
      metrics: [
        { label: 'Inspections Completed', value: 23 },
        { label: 'Samples Collected', value: 8 },
        { label: 'Violations Found', value: 3 },
        { label: 'FIRs Filed', value: 1 }
      ]
    },
    weekly: {
      title: 'Weekly Performance Report',
      metrics: [
        { label: 'Total Inspections', value: 147 },
        { label: 'Compliance Rate', value: '91.2%' },
        { label: 'High-Risk Areas', value: 12 },
        { label: 'Officer Efficiency', value: '88%' }
      ]
    },
    monthly: {
      title: 'Monthly Analytics Report',
      metrics: [
        { label: 'Total Seizures', value: 42 },
        { label: 'Lab Confirmations', value: 38 },
        { label: 'Legal Actions', value: 35 },
        { label: 'Revenue Impact', value: '₹8.5L' }
      ]
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Report Selection */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Report Types
        </h3>
        
        <div className="space-y-2">
          {Object.keys(reports).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedReport(key)}
              className={`w-full text-left p-3 rounded-lg ${
                selectedReport === key
                  ? darkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-green-100 text-green-800'
                  : darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
              }`}
            >
              {reports[key as keyof typeof reports].title}
            </button>
          ))}
        </div>
        
        <div className="mt-6 space-y-2">
          <button
            onClick={() => handleGenerateReport(selectedReport)}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Generate Report
          </button>
          
          <button
            onClick={() => handleExportData('PDF')}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Export as PDF
          </button>
          
          <button
            onClick={() => handleExportData('Excel')}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Export as Excel
          </button>
        </div>
      </div>
      
      {/* Report Content */}
      <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {reports[selectedReport as keyof typeof reports].title}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {reports[selectedReport as keyof typeof reports].metrics.map((metric, index) => (
            <div
              key={index}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}
            >
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {metric.label}
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        
        {/* Chain of Custody Audit Trail */}
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
          <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Audit Trail
          </h4>
          
          <div className="space-y-3">
            {[
              { time: '10:30 AM', action: 'Sample LAB-001 received at SPTL', user: 'Lab Tech' },
              { time: '09:45 AM', action: 'FIR-234 submitted to e-FIR system', user: 'Legal Officer' },
              { time: '08:30 AM', action: 'Seizure SEZ-567 logged at Kolhapur', user: 'Ram Kumar' },
              { time: '08:00 AM', action: 'Inspection task INS-890 started', user: 'Priya Sharma' }
            ].map((entry, index) => (
              <div
                key={index}
                className={`flex justify-between items-center text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <span>{entry.time}</span>
                <span className="flex-1 mx-2">{entry.action}</span>
                <span className="font-medium">{entry.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAuditModule;