// DashboardModule.tsx with inline styles for grid layout
import React from 'react';
import { Calendar, Package, Building, Scale, UserCheck, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAppContext } from '../context/AppContext';

const DashboardModule = () => {
  const { darkMode, seizures = [], labSamples = [], firCases = [], inspectionTasks = [] } = useAppContext();
  
  // Performance metrics data
  const performanceData = [
    { month: 'Jan', inspections: 234, violations: 28, seizures: 15 },
    { month: 'Feb', inspections: 267, violations: 35, seizures: 22 },
    { month: 'Mar', inspections: 298, violations: 42, seizures: 31 },
    { month: 'Apr', inspections: 312, violations: 38, seizures: 27 },
    { month: 'May', inspections: 324, violations: 45, seizures: 33 },
  ];
  
  // Officer performance data
  const officerPerformance = [
    { name: 'Ram Kumar', inspections: 45, seizures: 8, compliance: 92 },
    { name: 'Priya Sharma', inspections: 52, seizures: 12, compliance: 89 },
    { name: 'Suresh Patil', inspections: 38, seizures: 5, compliance: 95 },
    { name: 'Anjali Singh', inspections: 41, seizures: 7, compliance: 91 },
    { name: 'Vikram Reddy', inspections: 49, seizures: 10, compliance: 88 },
  ];
  
  // Hotspot data
  const hotspotData = [
    { area: 'Kolhapur', riskLevel: 85, violations: 22 },
    { area: 'Sangli', riskLevel: 72, violations: 18 },
    { area: 'Solapur', riskLevel: 68, violations: 15 },
    { area: 'Ahmednagar', riskLevel: 78, violations: 20 },
    { area: 'Pune', riskLevel: 65, violations: 12 },
  ];

  // Style for stat cards container
  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  };

  // Style for a single stat card
  const statCardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between'
  };

  // Style for charts grid
  const chartsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '24px'
  };

  // Style for chart container
  const chartContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    height: '300px'
  };
  
  return (
    <div style={{ width: '100%' }}>
      {/* Alert Banner */}
      <div style={{ 
        backgroundColor: '#fee2e2', 
        borderLeftWidth: '4px', 
        borderLeftColor: '#ef4444',
        padding: '16px',
        marginBottom: '24px',
        borderRadius: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AlertTriangle style={{ color: '#ef4444', marginRight: '12px' }} />
          <div>
            <h3 style={{ fontWeight: '600', color: '#991b1b' }}>
              Escalation Alert: 3 Pending FIRs
            </h3>
            <p style={{ color: '#b91c1c' }}>
              Lab reports confirmed violations. Immediate legal action required for seized samples LAB-001, LAB-003, LAB-007.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div style={statsContainerStyle}>
        <StatCard 
          title="Total Inspections" 
          value={inspectionTasks.length.toString() || "0"}
          trend="+12% from last month"
          icon={<Calendar size={24} />}
          color="#3b82f6"
        />
        <StatCard 
          title="Active Seizures" 
          value={seizures.length.toString() || "0"}
          trend="+8% from last month" 
          color="#eab308"
          icon={<Package size={24} />}
        />
        <StatCard 
          title="Lab Samples" 
          value={labSamples.length.toString() || "0"}
          trend="5 pending results"
          color="#8b5cf6"
          icon={<Building size={24} />}
        />
        <StatCard 
          title="FIR Cases" 
          value={firCases.length.toString() || "0"}
          trend="3 filed this week"
          color="#ef4444"
          icon={<Scale size={24} />}
        />
        <StatCard 
          title="Compliance Rate" 
          value="91.2%"
          trend="+2.3% improvement"
          color="#10b981"
          icon={<UserCheck size={24} />}
        />
      </div>
      
      {/* Charts Grid */}
      <div style={chartsGridStyle}>
        {/* Performance Trends */}
        <div style={chartContainerStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            Monthly Inspection Trends
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="inspections" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="violations" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="seizures" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Officer Performance */}
        <div style={chartContainerStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            Officer-wise Performance
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '85%', overflowY: 'auto' }}>
            {officerPerformance.map((officer, index) => (
              <div key={index} style={{ 
                backgroundColor: '#f8fafc', 
                padding: '12px', 
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '500' }}>
                  {officer.name}
                </span>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                  <span>Inspections: {officer.inspections}</span>
                  <span>Seizures: {officer.seizures}</span>
                  <span style={{ 
                    fontWeight: '500', 
                    color: officer.compliance > 90 ? '#10b981' : '#eab308'
                  }}>
                    {officer.compliance}% Compliance
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hotspot Map */}
      <div style={{
        ...chartContainerStyle,
        height: '350px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          High-Risk Area Identification
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={hotspotData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="area" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="riskLevel" fill="#ff6b6b" name="Risk Level %" />
            <Bar dataKey="violations" fill="#4ecdc4" name="Violations" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Simple StatCard component with inline styles
const StatCard = ({ title, value, trend, color, icon }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>{title}</h3>
          <p style={{ fontSize: '24px', fontWeight: '700', color: color, marginTop: '8px' }}>{value}</p>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>{trend}</p>
        </div>
        <div style={{ 
          padding: '12px', 
          borderRadius: '8px', 
          backgroundColor: color + '10' // Adding transparency
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;