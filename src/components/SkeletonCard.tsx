import React from 'react';
import StatCard from './StatCard'; // Add this import

const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded h-24 w-full mb-4"></div>
);

const YourComponent = ({ isLoading }) => (
  <div>
    {isLoading ? <SkeletonCard /> : <StatCard />}
  </div>
);

export default SkeletonCard; // Only export SkeletonCard for use in Suspense fallback