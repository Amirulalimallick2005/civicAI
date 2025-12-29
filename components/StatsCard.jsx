import React from 'react';
import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';

const StatsCard = ({ title, value, change, icon, color, trend = 'up' }) => {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <div className="stats-icon" style={{ backgroundColor: color + '20', color }}>
          {icon}
        </div>
        <button className="stats-menu">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="stats-content">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-title">{title}</p>
      </div>
      
      <div className="stats-footer">
        <div className={`stats-change ${trend}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change}</span>
        </div>
        <span className="stats-period">vs last month</span>
      </div>
    </div>
  );
};

export default StatsCard;