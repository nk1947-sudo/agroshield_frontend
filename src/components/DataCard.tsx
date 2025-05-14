import React from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, icon, bgColor = 'bg-white' }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${bgColor}`}>
      <div className="flex items-center mb-4">
        {icon && <div className="mr-4 text-2xl">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
