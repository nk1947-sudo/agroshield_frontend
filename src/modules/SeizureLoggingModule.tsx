import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Package, FileText, AlertCircle } from 'lucide-react';

const SeizureLoggingModule = () => {
  const { darkMode, seizures, addToast, addLabSample } = useAppContext();
  const [selectedSeizure, setSelectedSeizure] = useState(null);

  const handleGenerateMemo = (seizure) => {
    addToast(`Seizure memo generated for ${seizure.id}`, 'success');
    // Generate PDF memo logic here
  };

  const handleDispatchToLab = (seizure) => {
    addToast(`Sample ${seizure.id} dispatched to SPTL lab`, 'success');
    // Update seizure status and create tracking
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Seizures</h3>
        <div className="space-y-4">
          {seizures.map((seizure) => (
            <div
              key={seizure.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500`}
              onClick={() => setSelectedSeizure(seizure)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{seizure.id} - {seizure.product}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Location: {seizure.location}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quantity: {seizure.quantity}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${seizure.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{seizure.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Seizure Details</h3>
        {selectedSeizure ? (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedSeizure.id}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Product: {selectedSeizure.product}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Batch: {selectedSeizure.batchNumber}</p>
            </div>

            <div className="space-y-2">
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
