import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Package, Building, Calendar, UserCheck } from 'lucide-react';
import StatCard from '../components/StatCard'; // Assuming you've created this reusable component
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const DashboardModule = () => {
  const { darkMode, seizures, labSamples, firCases, inspectionTasks } = useAppContext();
  
  const performanceData = [
    { month: 'Jan', inspections: 234, violations: 28, seizures: 15 },
    { month: 'Feb', inspections: 267, violations: 35, seizures: 22 },
    { month: 'Mar', inspections: 298, violations: 42, seizures: 31 },
    { month: 'Apr', inspections: 312, violations: 38, seizures: 27 },
    { month: 'May', inspections: 324, violations: 45, seizures: 33 },
  ];

  const officerPerformance = [
    { name: 'Ram Kumar', inspections: 45, seizures: 8, compliance: 92 },
    { name: 'Priya Sharma', inspections: 52, seizures: 12, compliance: 89 }, // Suppress spell-check warnings or add to dictionary
    { name: 'Suresh Patil', inspections: 38, seizures: 5, compliance: 95 }, // Suppress spell-check warnings or add to dictionary
    { name: 'Anjali Singh', inspections: 41, seizures: 7, compliance: 91 }, // Suppress spell-check warnings or add to dictionary
    { name: 'Vikram Reddy', inspections: 49, seizures: 10, compliance: 88 }, // Suppress spell-check warnings or add to dictionary
  ];

  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 mb-6`}>
        <StatCard title="Total Inspections" value={inspectionTasks.length.toString()} trend="+12% from last month" icon={<Calendar size={24} />} color="blue" />
        <StatCard title="Active Seizures" value={seizures.length.toString()} trend="+8% from last month" icon={<Package size={24} />} color="yellow" />
        <StatCard title="Lab Samples" value={labSamples.length.toString()} trend="5 pending results" icon={<Building size={24} />} color="purple" />
        <StatCard title="FIR Cases" value={firCases.length.toString()} trend="3 filed this week" icon={<UserCheck size={24} />} color="red" />
        <StatCard title="Compliance Rate" value="91.2%" trend="+2.3% improvement" color="green" icon={<UserCheck size={24} />} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Inspection Trends */}
        <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Monthly Inspection Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                <XAxis dataKey="month" stroke={darkMode ? '#aaa' : '#666'} />
                <YAxis stroke={darkMode ? '#aaa' : '#666'} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333', border: darkMode ? '1px solid #444' : '1px solid #ddd' }} />
                <Area type="monotone" dataKey="inspections" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="violations" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="seizures" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Officer Performance */}
        <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Officer-wise Performance</h3>
          <div className="space-y-3">
            {officerPerformance.map((officer, index) => (
              <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{officer.name}</span>
                  <div className="flex gap-4 text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Inspections: {officer.inspections}</span>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Seizures: {officer.seizures}</span>
                    <span className={`font-medium ${officer.compliance > 90 ? 'text-green-500' : 'text-yellow-500'}`}>{officer.compliance}% Compliance</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;
