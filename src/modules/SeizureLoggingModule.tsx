// SeizureLoggingModule.tsx
import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SeizureLoggingModule: React.FC = () => {
  const { darkMode, seizures, addToast } = useAppContext();
  const [selectedSeizure, setSelectedSeizure] = useState<any | null>(null);
  
  const handleGenerateMemo = (seizure: any) => {
    addToast(`Seizure memo generated for ${seizure.id}`, 'success');
    // Generate PDF memo logic here
  };
  
  const handleDispatchToLab = (seizure: any) => {
    addToast(`Sample ${seizure.id} dispatched to SPTL lab`, 'success');
    // Update seizure status and create tracking
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Active Seizures List */}
      <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Active Seizures
        </h3>
        
        <div className="space-y-4">
          {seizures.map((seizure) => (
            <div
              key={seizure.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500`}
              onClick={() => setSelectedSeizure(seizure)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {seizure.id} - {seizure.company} {seizure.product}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Location: {seizure.geoLocation}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Quantity: {seizure.quantity || 'N/A'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Time: {new Date(seizure.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  seizure.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : seizure.status === 'dispatched'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {seizure.status || 'pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Seizure Details */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Seizure Details
        </h3>
        
        {selectedSeizure ? (
          <div className="space-y-4">
            <div>
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedSeizure.id}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedSeizure.company} - {selectedSeizure.product}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Batch Number:
                </span>
                <span className="font-medium">{selectedSeizure.batchNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Authenticity Score:
                </span>
                <span className={`font-medium ${
                  selectedSeizure.authenticityScore > 70 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {selectedSeizure.authenticityScore}%
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Estimated Value:
                </span>
                <span className="font-medium">{selectedSeizure.estimatedValue || 'N/A'}</span>
              </div>
            </div>
            
            {selectedSeizure.issues && selectedSeizure.issues.length > 0 && (
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  Issues Detected:
                </p>
                <ul className="list-disc list-inside">
                  {selectedSeizure.issues.map((issue: string, index: number) => (
                    <li key={index} className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="space-y-2 pt-4">
              <button
                onClick={() => handleGenerateMemo(selectedSeizure)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Generate Seizure Memo
              </button>
              
              <button
                onClick={() => handleDispatchToLab(selectedSeizure)}
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Dispatch to Lab
              </button>
              
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Initiate Legal Action
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Package size={48} className="mx-auto mb-4" />
            <p>Select a seizure to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeizureLoggingModule;
