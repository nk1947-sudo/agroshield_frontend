import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Camera, QrCode, Fingerprint, Map } from 'lucide-react';

const FieldExecutionModule = () => {
  const { darkMode, addToast, addSeizure, addLabSample } = useAppContext();
  const [activeDevice, setActiveDevice] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [bodyCamActive, setBodyCamActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const handleDeviceActivation = (device) => {
    setActiveDevice(device);
    if (device === 'bodycam') {
      setBodyCamActive(!bodyCamActive);
      addToast(`Body cam ${!bodyCamActive ? 'activated' : 'deactivated'}`, 'info');
    }
  };

  const handleProductScan = () => {
    const isCounterfeit = Math.random() > 0.5;
    const result = {
      company: selectedCompany || 'UPL',
      product: selectedProduct || 'Saaf',
      batchNumber: `${selectedCompany || 'UPL'}-${Date.now()}`,
      authenticityScore: isCounterfeit ? 35 : 95,
      issues: isCounterfeit ? ['Hologram missing', 'Batch format incorrect'] : [],
      recommendation: isCounterfeit ? 'Suspected Counterfeit' : 'Authentic',
      geoLocation: '16.7050° N, 74.2433° E',
      timestamp: new Date().toISOString()
    };

    setScanResult(result);

    if (isCounterfeit) {
      addToast('Counterfeit detected! Initiating seizure protocol.', 'error');
    } else {
      addToast('Product verified authentic.', 'success');
    }
  };

  const handleSeizure = () => {
    if (scanResult && scanResult.authenticityScore < 50) {
      const seizure = {
        ...scanResult,
        quantity: '50 units',
        estimatedValue: '₹25,000',
        witnessName: 'Shop Owner',
        evidencePhotos: ['photo1.jpg', 'photo2.jpg'],
        videoEvidence: 'video1.mp4'
      };

      addSeizure(seizure);
      addLabSample({
        ...seizure,
        sampleType: 'Pesticide',
        labDestination: 'SPTL Ghaziabad'
      });

      addToast('Seizure logged and sample prepared for lab dispatch.', 'success');
    }
  };

  return (
    <div>
      <div className={`bg-${darkMode ? 'gray-700' : 'gray-50'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Field Equipment Control</h3>
        <div className="space-y-4">
          <div className={`flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <Camera size={24} />
            <button className={`px-4 py-2 ${bodyCamActive ? 'bg-red-600' : 'bg-green-600'} text-white rounded`} onClick={() => handleDeviceActivation('bodycam')}>
              {bodyCamActive ? 'Stop' : 'Start'} Recording
            </button>
          </div>

          <div className={`flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <QrCode size={24} />
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => handleDeviceActivation('truscan')}>Activate TruScan</button>
          </div>

          <div className={`flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <Fingerprint size={24} />
            <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={() => handleDeviceActivation('gemini')}>Activate Gemini</button>
          </div>
        </div>
      </div>

      <div className={`bg-${darkMode ? 'gray-700' : 'white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Product Testing Interface</h3>
        <div className="space-y-4 mb-6">
          <input type="text" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} placeholder="Product Name" className="w-full px-3 py-2 rounded-lg border" />
          <input type="text" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} placeholder="Company Name" className="w-full px-3 py-2 rounded-lg border" />
          <button onClick={handleProductScan} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Scan Product
          </button>
        </div>

        {scanResult && (
          <div className={`bg-${darkMode ? 'gray-700' : 'gray-50'} p-4 rounded-lg`}>
            <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Test Results</h4>
            <div className="space-y-2">
              <p>Authenticity Score: {scanResult.authenticityScore}%</p>
              <p>Batch Number: {scanResult.batchNumber}</p>
              <p>Recommendation: {scanResult.recommendation}</p>
            </div>

            <button onClick={handleSeizure} className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              Initiate Seizure Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldExecutionModule;
