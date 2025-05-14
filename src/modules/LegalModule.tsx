import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Scale, FileText, AlertCircle, Download } from 'lucide-react';

const LegalModule = () => {
  const { darkMode, firCases, addFIRCase, addToast } = useAppContext();
  const [selectedCase, setSelectedCase] = useState(null);

  const handleFileSystemIntegration = (caseId, system) => {
    addToast(`${system} integration initiated for case ${caseId}`, 'info');
    // Integration logic here
  };

  const handleFIRSubmission = (firCase) => {
    addToast(`FIR submitted to e-FIR system for case ${firCase.id}`, 'success');
    // Update case status
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>FIR Cases</h3>

        <div className="space-y-4">
          {firCases.map((firCase) => (
            <div
              key={firCase.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg cursor-pointer hover:ring-2 hover:ring-purple-500`}
              onClick={() => setSelectedCase(firCase)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{firCase.id}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Lab Report: {firCase.labReportId}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${firCase.status === 'draft' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                  {firCase.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            const newCase = {
              labReportId: 'LAB-' + Date.now(),
              violationType: 'Counterfeit Product',
              accused: 'Shop Name',
              location: 'Kolhapur Market'
            };
            addFIRCase(newCase);
          }}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Create New FIR
        </button>
      </div>

      <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Legal Actions</h3>

        {selectedCase ? (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Case Details</h4>
              <div className="space-y-2">
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Case ID: {selectedCase.id}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Violation: {selectedCase.violationType}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleFileSystemIntegration(selectedCase.id, 'Police e-FIR')}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                <FileText size={18} />
                Submit to Police e-FIR System
              </button>

              <button
                onClick={() => handleFileSystemIntegration(selectedCase.id, 'License Suspension')}
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
              >
                <AlertCircle size={18} />
                Initiate License Suspension
              </button>

              <button
                onClick={() => handleFileSystemIntegration(selectedCase.id, 'Court Filing')}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                <Scale size={18} />
                Prepare Court Filing
              </button>

              <button
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                <Download size={18} />
                Download Legal Documents
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Scale size={48} className="mx-auto mb-4" />
            <p>Select a case to view legal actions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalModule;
