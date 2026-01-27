import React, { useState } from 'react';
import { Navigation, MapPin, ArrowLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function MapView({ markers = [], onMarkerClick, onStatusUpdate }) {
  const [zoomId, setZoomId] = useState(null);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Resolved': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'Pending': return '#ef4444';
      default: return '#64748b';
    }
  };

  const handleMarkerClick = (marker) => {
    setZoomId(marker.id);
    if (onMarkerClick) onMarkerClick(marker);
  };

  const resetZoom = () => setZoomId(null);

  // Calculate zoom focus based on marker index
  const focusedIndex = markers.findIndex(m => m.id === zoomId);
  const zoomX = focusedIndex !== -1 ? 20 + (focusedIndex * 22) % 65 : 50;
  const zoomY = focusedIndex !== -1 ? 25 + (focusedIndex * 19) % 55 : 50;

  return (
    <div className="map-container">
      <style>{`
        .map-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .map-canvas-wrapper {
          flex: 1;
          position: relative;
          overflow: hidden;
          background-color: #f1f5f9;
        }

        .map-canvas {
          width: 100%;
          height: 100%;
          position: relative;
          background-image: 
            radial-gradient(#cbd5e1 1px, transparent 1px),
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px, 80px 80px, 80px 80px;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: ${zoomX}% ${zoomY}%;
        }

        .zoomed { transform: scale(3.5); }

        .back-button {
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 100;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 8px 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #1e293b;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
        }

        .back-button:hover { background: #f8fafc; transform: translateX(-3px); }

        .map-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          z-index: 10;
          transition: opacity 0.4s ease;
        }

        .marker-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.15);
          position: relative;
          z-index: 2;
        }

        .pulse-effect {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 50%;
          animation: marker-pulse 2s infinite;
          opacity: 0.6;
        }

        @keyframes marker-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(4); opacity: 0; }
        }

        /* Tooltip Styling */
        .marker-tooltip {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #0f172a;
          color: white;
          padding: 12px;
          border-radius: 12px;
          width: 220px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
          z-index: 50;
        }

        .map-marker:hover .marker-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        .tooltip-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .inc-id { color: #60a5fa; font-weight: 800; font-size: 10px; }
        .status-badge { font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 700; text-transform: uppercase; }

        .address-box {
          display: flex;
          gap: 6px;
          font-size: 11px;
          color: #94a3b8;
          margin-top: 8px;
          line-height: 1.4;
        }

        /* Status Update Quick Actions */
        .quick-actions {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #334155;
          display: flex;
          gap: 5px;
        }

        .action-chip {
          flex: 1;
          background: #1e293b;
          border: 1px solid #334155;
          color: #cbd5e1;
          font-size: 9px;
          padding: 4px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .action-chip:hover { background: #334155; color: white; }
      `}</style>

      {zoomId && (
        <button className="back-button" onClick={resetZoom}>
          <ArrowLeft size={16} /> Back to Grid
        </button>
      )}

      <div className="map-canvas-wrapper">
        <div className={`map-canvas ${zoomId ? 'zoomed' : ''}`}>
          
          {/* Default Navigation Center Icon */}
          {!zoomId && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3 }}>
              <Navigation size={48} color="#2563eb" fill="#2563eb" />
            </div>
          )}

          {markers.map((marker, index) => {
            const left = 20 + (index * 22) % 65;
            const top = 25 + (index * 19) % 55;
            const color = getMarkerColor(marker.status);
            const isSelected = zoomId === marker.id;
            const isDimmed = zoomId && !isSelected;

            return (
              <div
                key={marker.id}
                className="map-marker"
                style={{ 
                  left: `${left}%`, 
                  top: `${top}%`,
                  opacity: isDimmed ? 0.15 : 1,
                  zIndex: isSelected ? 100 : 10
                }}
              >
                <button 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onClick={() => handleMarkerClick(marker)}
                >
                  {marker.status === 'Pending' && (
                    <div className="pulse-effect" style={{ backgroundColor: color }}></div>
                  )}
                  <div className="marker-dot" style={{ backgroundColor: color }}></div>
                </button>
                
                <div className="marker-tooltip">
                  <div className="tooltip-header">
                    <span className="inc-id">INC-{marker.id.toString().slice(-4).toUpperCase()}</span>
                    <span className="status-badge" style={{ background: color + '33', color: color }}>
                      {marker.status}
                    </span>
                  </div>
                  
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'white' }}>{marker.type}</div>
                  
                  <div className="address-box">
                    <MapPin size={12} style={{ flexShrink: 0 }} />
                    <span>{marker.address || "Street Map Location unavailable"}</span>
                  </div>

                  <div className="quick-actions">
                    <button className="action-chip" onClick={() => onStatusUpdate?.(marker.id, 'In Progress')}>
                      <Clock size={10} /> Progress
                    </button>
                    <button className="action-chip" onClick={() => onStatusUpdate?.(marker.id, 'Resolved')}>
                      <CheckCircle size={10} /> Resolve
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}