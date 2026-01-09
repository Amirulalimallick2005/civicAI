import React from 'react';

// Removed TypeScript interface StatsCardProps
// Removed LucideIcon type import

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, // Destructuring and renaming to 'Icon' for React component usage
  trend,
  trendUp,
  bgColor = 'from-blue-50 to-blue-100',
  iconColor = 'text-blue-600',
  textColor = 'text-blue-900'
}) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 border border-slate-200 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        {/* We use <Icon /> here because it was passed as a component reference */}
        <Icon className={`w-8 h-8 ${iconColor}`} />
        
        {trend && (
          <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className={`text-3xl font-bold mb-1 ${textColor}`}>{value}</p>
      <p className={`text-sm ${textColor} opacity-80 font-medium`}>{title}</p>
    </div>
  );
}