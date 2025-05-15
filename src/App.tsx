import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const DashboardModule = lazy(() => import('./modules/DashboardModule'));
const FieldExecutionModule = lazy(() => import('./modules/FieldExecutionModule'));
const InspectionPlanningModule = lazy(() => import('./modules/InspectionPlanningModule'));
const LabInterfaceModule = lazy(() => import('./modules/LabInterfaceModule'));
const LegalModule = lazy(() => import('./modules/LegalModule'));
const ReportAuditModule = lazy(() => import('./modules/ReportAuditModule'));
const SeizureLoggingModule = lazy(() => import('./modules/SeizureLoggingModule'));

import Breadcrumbs from './components/Breadcrumbs';
import SkeletonCard from './components/SkeletonCard';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-container">
        <Breadcrumbs />
        <Routes>
          {/* Redirect root to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <DashboardModule />
              </Suspense>
            }
          />

          {/* Other routes */}
          <Route
            path="/field-execution"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <FieldExecutionModule />
              </Suspense>
            }
          />
          <Route
            path="/inspection-planning"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <InspectionPlanningModule />
              </Suspense>
            }
          />
          <Route
            path="/lab-interface"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <LabInterfaceModule />
              </Suspense>
            }
          />
          <Route
            path="/legal"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <LegalModule />
              </Suspense>
            }
          />
          <Route
            path="/reports"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <ReportAuditModule />
              </Suspense>
            }
          />
          <Route
            path="/seizure-logging"
            element={
              <Suspense fallback={<SkeletonCard />}>
                <SeizureLoggingModule />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
