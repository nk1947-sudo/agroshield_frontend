import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, Camera, QrCode, Map, Fingerprint } from 'lucide-react';

const InspectionPlanningModule = () => {
  const { darkMode, addToast, addInspectionTask } = useAppContext();
  const [newTask, setNewTask] = useState({
    officer: '',
    date: '',
    location: '',
    targetType: '',
    equipment: []
  });

  const equipment = [
    { id: 'truscan', name: 'TruScan Device', icon: <QrCode size={16} /> },
    { id: 'gemini', name: 'Gemini Analyzer', icon: <Fingerprint size={16} /> },
    { id: 'bodycam', name: 'Axon Body Cam', icon: <Camera size={16} /> },
    { id: 'gps', name: 'GPS Tracker', icon: <Map size={16} /> },
  ];

  const officers = [
    'Ram Kumar', 'Priya Sharma', 'Suresh Patil', 'Anjali Singh', 'Vikram Reddy'
  ];

  const handleTaskSubmit = () => {
    addInspectionTask(newTask);
    addToast('Inspection task created successfully', 'success');
    setNewTask({
      officer: '',
      date: '',
      location: '',
      targetType: '',
      equipment: []
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create Inspection Visit Plan</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Field Officer</label>
            <select
              value={newTask.officer}
              onChange={(e) => setNewTask({ ...newTask, officer: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value="">Select Officer</option>
              {officers.map(officer => (
                <option key={officer} value={officer}>{officer}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Visit Date</label>
            <input
              type="datetime-local"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
            <input
              type="text"
              value={newTask.location}
              onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
              placeholder="e.g., Kolhapur Market, Sangli Warehouse"
              className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target Type</label>
            <select
              value={newTask.targetType}
              onChange={(e) => setNewTask({ ...newTask, targetType: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value="">Select Target</option>
              <option value="retailer">Retailer</option>
              <option value="distributor">Distributor</option>
              <option value="warehouse">Warehouse</option>
              <option value="market">Market Survey</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Equipment Assignment</label>
            <div className="space-y-2">
              {equipment.map(item => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newTask.equipment.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewTask({ ...newTask, equipment: [...newTask.equipment, item.id] });
                      } else {
                        setNewTask({ ...newTask, equipment: newTask.equipment.filter(id => id !== item.id) });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleTaskSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Inspection Task
          </button>
        </div>
      </div>

      {/* Weekly Calendar View */}
      <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Weekly Visit Calendar</h3>

        <div className="space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
            const dayTasks = index < 3 ? 2 : 1; // Mock data
            return (
              <div
                key={day}
                className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-3 rounded-lg`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{day}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dayTasks} visits scheduled</span>
                </div>
                {dayTasks > 0 && (
                  <div className="mt-2 space-y-1">
                    {Array.from({ length: dayTasks }).map((_, i) => (
                      <div
                        key={i}
                        className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} pl-4`}
                        >
                        • {i === 0 ? 'Kolhapur Market - Ram Kumar' : 'Sangli Warehouse - Priya Sharma'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InspectionPlanningModule;
