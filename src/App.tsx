import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import DashboardModule from './modules/DashboardModule';
import FieldExecutionModule from './modules/FieldExecutionModule';
import InspectionPlanningModule from './modules/InspectionPlanningModule';
import LabInterfaceModule from './modules/LabInterfaceModule';
import LegalModule from './modules/LegalModule';
import ReportAuditModule from './modules/ReportAuditModule';
import SeizureLoggingModule from './modules/SeizureLoggingModule';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Redirect root to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Route for Dashboard */}
          <Route path="/dashboard" element={<DashboardModule />} />

          {/* Other routes */}
          <Route path="/field-execution" element={<FieldExecutionModule />} />
          <Route path="/inspection-planning" element={<InspectionPlanningModule />} />
          <Route path="/lab-interface" element={<LabInterfaceModule />} />
          <Route path="/legal" element={<LegalModule />} />
          <Route path="/reports" element={<ReportAuditModule />} />
          <Route path="/seizure-logging" element={<SeizureLoggingModule />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
