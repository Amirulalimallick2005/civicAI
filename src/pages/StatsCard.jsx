import React from 'react';

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  trendUp,
  // We've updated defaults to match the new "Slate & Blue" professional palette
  bgColor = 'bg-white', 
  iconColor = 'text-blue-600',
  textColor = 'text-slate-900'
}) {
  return (
    <div className={`glass-panel p-5 transition-all duration-300 hover:-translate-y-1 ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        {/* Icon Container with a soft background circle */}
        <div className={`p-2.5 rounded-lg bg-slate-50 border border-slate-100`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {trendUp ? '↑' : '↓'} {trend}
          </div>
        )}
      </div>

      <div>
        <h3 className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
          {value}
        </h3>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
          {title}
        </p>
      </div>

      {/* Subtle decorative element for that "Chic" look */}
      <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
        <div 
          className={`h-full opacity-60 ${iconColor.replace('text', 'bg')}`} 
          style={{ width: '40%' }} 
        />
      </div>
    </div>
  );
}