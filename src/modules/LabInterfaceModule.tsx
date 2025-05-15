// LabInterfaceModule.tsx
import React, { useState } from 'react';
import { QrCode, Building } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LabInterfaceModule: React.FC = () => {
  const { darkMode, labSamples, addToast } = useAppContext();
  const [selectedSample, setSelectedSample] = useState<any | null>(null);
  const [labResults, setLabResults] = useState<Record<string, string>>({});
  
  const handleResultUpload = (sampleId: string, result: string) => {
    setLabResults({ ...labResults, [sampleId]: result });
    addToast(`Lab results uploaded for sample ${sampleId}`, 'success');
    
    if (result === 'violation-confirmed') {
      addToast('Violation confirmed! Legal alert sent.', 'error');
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sample Queue */}
      <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Lab Sample Queue
        </h3>
        
        <div className="space-y-4">
          {labSamples.map((sample) => (
            <div
              key={sample.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg cursor-pointer hover:ring-2 hover:ring-purple-500`}
              onClick={() => setSelectedSample(sample)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {sample.id} - {sample.company} {sample.product}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Type: {sample.sampleType}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Source: {sample.location || 'Field Collection'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Lab: {sample.labDestination}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  sample.status === 'in-transit' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : sample.status === 'received'
                    ? 'bg-blue-100 text-blue-800'
                    : sample.status === 'testing'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {sample.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lab Testing Interface */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Lab Testing
        </h3>
        
        {selectedSample ? (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Sample Details
              </h4>
              <div className="space-y-2">
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  ID: {selectedSample.id}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Product: {selectedSample.company} {selectedSample.product}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Batch: {selectedSample.batchNumber}
                </p>
              </div>
            </div>
            
            {/* Barcode Scanner */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <div className="flex items-center justify-center py-4">
                <QrCode size={48} />
              </div>
              <p className={`text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Scan barcode to verify sample
              </p>
            </div>
            
            {/* Test Results */}
            <div className="space-y-2">
              <button
                onClick={() => handleResultUpload(selectedSample.id, 'violation-confirmed')}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Violation Confirmed
              </button>
              
              <button
                onClick={() => handleResultUpload(selectedSample.id, 'compliant')}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Product Compliant
              </button>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Upload Detailed Report
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Building size={48} className="mx-auto mb-4" />
            <p>Select a sample to begin testing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabInterfaceModule;