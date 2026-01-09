import React from 'react';
import { MapPin, Map } from 'lucide-react';

// Removed TypeScript interfaces (MapMarker and MapViewProps)

export default function MapView({ markers = [], onMarkerClick }) {
  // Removed type annotation ': string'
  const getMarkerColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Assigned': return 'bg-yellow-500';
      case 'Pending': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Map Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Issue Map</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-600">Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-600">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Canvas - Placeholder with styled markers */}
      <div className="relative w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200">
        {/* City Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Markers - Added optional chaining (?.) to prevent 'undefined' crash */}
        {markers?.map((marker, index) => {
          // Position markers in a visually distributed pattern
          const left = 15 + (index % 5) * 15 + (Math.sin(index) * 5); // Replaced random with sin for stability
          const top = 15 + Math.floor(index / 5) * 20 + (Math.cos(index) * 5);

          return (
            <button
              key={marker.id}
              onClick={() => onMarkerClick && onMarkerClick(marker)}
              className="absolute group transform -translate-x-1/2 -translate-y-1/2 transition hover:scale-110"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className={`w-4 h-4 ${getMarkerColor(marker.status)} rounded-full border-2 border-white shadow-lg`}></div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                  <p className="font-medium">{marker.type}</p>
                  <p className="text-slate-300">{marker.status}</p>
                </div>
              </div>
            </button>
          );
        })}

        {/* Center location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition">
            <span className="text-slate-600 font-bold">+</span>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition">
            <span className="text-slate-600 font-bold">-</span>
          </button>
        </div>
      </div>

      {/* Map Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3">
        <p className="text-xs text-slate-600">
          Showing {markers?.length || 0} issues • Click markers for details
        </p>
      </div>
    </div>
  );
}