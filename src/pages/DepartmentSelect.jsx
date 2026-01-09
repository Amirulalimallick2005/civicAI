import React from 'react';
import { 
  Trash2, 
  Construction, 
  Droplet, 
  Zap, 
  Building,
  Shield,
  ArrowRight
} from 'lucide-react';

// Removed Department and DepartmentSelectProps interfaces

const departments = [
  {
    id: 'solid-waste',
    name: 'Solid Waste',
    description: 'Garbage collection, sanitation, and waste management',
    icon: Trash2,
    color: 'from-green-50 to-green-100 border-green-200'
  },
  {
    id: 'roads-infrastructure',
    name: 'Roads & Infrastructure',
    description: 'Potholes, road maintenance, and public works',
    icon: Construction,
    color: 'from-orange-50 to-orange-100 border-orange-200'
  },
  {
    id: 'water-supply',
    name: 'Water Supply',
    description: 'Water distribution, pipeline issues, and supply management',
    icon: Droplet,
    color: 'from-blue-50 to-blue-100 border-blue-200'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    description: 'Streetlights, power supply, and electrical infrastructure',
    icon: Zap,
    color: 'from-yellow-50 to-yellow-100 border-yellow-200'
  },
  {
    id: 'general-civic',
    name: 'General Civic',
    description: 'Parks, community facilities, and miscellaneous issues',
    icon: Building,
    color: 'from-purple-50 to-purple-100 border-purple-200'
  }
];

export default function DepartmentSelect({ onSelectDepartment }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-4 md:p-8 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 w-full">
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Select Department</h1>
            <p className="text-slate-600">Secure entry point for municipal authority administrators</p>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-blue-100 rounded-xl p-4 max-w-2xl mx-auto shadow-sm">
          <p className="text-sm text-blue-900 text-center">
            <span className="font-bold uppercase text-[10px] bg-blue-100 px-2 py-0.5 rounded mr-2">System Info</span>
            Access is logged. Select your specific department to manage active civic reports and field workers.
          </p>
        </div>
      </div>

      {/* Department Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {departments.map((dept) => {
          const Icon = dept.icon;
          
          return (
            <button
              key={dept.id}
              onClick={() => onSelectDepartment(dept)}
              className={`bg-gradient-to-br ${dept.color} border rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-white group relative overflow-hidden`}
            >
              {/* Subtle background decoration */}
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Icon size={120} />
              </div>

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md ring-4 ring-white/50 group-hover:ring-blue-200 transition-all`}>
                  <Icon className="w-7 h-7 text-slate-700" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{dept.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 h-10 line-clamp-2">
                  {dept.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Secure Admin Portal v2.4
        </div>
      </div>
    </div>
  );
}