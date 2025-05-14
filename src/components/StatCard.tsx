import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
  return (
    <div className={`bg-${color}-600 p-6 rounded-lg shadow-lg`}>
      <div className="flex items-center mb-4">
        <div className="text-white text-2xl">{icon}</div>
        <div className="ml-4 text-white">
          <h3 className="text-xl">{title}</h3>
          <p>{value}</p>
          <p>{trend}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
