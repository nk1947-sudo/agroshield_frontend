import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const routeNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  'inspection-planning': 'Inspection Planning',
  'field-execution': 'Field Execution',
  'seizure-logging': 'Seizure Logging',
  'legal': 'Legal Module',
  'lab-interface': 'Lab Interface',
  'reports': 'Reports & Audit',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex space-x-2 text-sm text-gray-500">
        <li>
          <Link to="/dashboard" className="hover:underline">Home</Link>
        </li>
        {pathnames.map((value, idx) => {
          const to = `/${pathnames.slice(0, idx + 1).join('/')}`;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={to} className="hover:underline">
                {routeNameMap[value] || value}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;