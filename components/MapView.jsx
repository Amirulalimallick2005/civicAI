import React, { useState } from 'react';
import { MapPin, Filter, Layers, Maximize2 } from 'lucide-react';

const MapView = ({ issues = [], onIssueSelect }) => {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const layers = [
    { id: 'all', label: 'All Issues', color: '#3B82F6' },
    { id: 'pending', label: 'Pending', color: '#F59E0B' },
    { id: 'in-progress', label: 'In Progress', color: '#8B5CF6' },
    { id: 'resolved', label: 'Resolved', color: '#10B981' },
  ];

  return (
    <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="map-header">
        <h3>City Map Overview</h3>
        <div className="map-controls">
          <button className="map-control-btn" title="Layers">
            <Layers size={18} />
          </button>
          <button className="map-control-btn" title="Filter">
            <Filter size={18} />
          </button>
          <button 
            className="map-control-btn" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="map-content">
        {/* Map visualization */}
        <div className="map-visualization">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="map-marker"
              style={{
                left: `${issue.coordinates.x}%`,
                top: `${issue.coordinates.y}%`,
                backgroundColor: layers.find(l => l.id === issue.status)?.color || '#3B82F6'
              }}
              onClick={() => onIssueSelect && onIssueSelect(issue)}
              title={issue.title}
            >
              <MapPin size={14} />
              <div className="marker-tooltip">
                <strong>{issue.title}</strong>
                <span>Priority: {issue.priority}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="map-legend">
          <h4>Legend</h4>
          {layers.map((layer) => (
            <div 
              key={layer.id} 
              className={`legend-item ${selectedLayer === layer.id ? 'active' : ''}`}
              onClick={() => setSelectedLayer(layer.id)}
            >
              <div className="legend-color" style={{ backgroundColor: layer.color }} />
              <span>{layer.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="map-stats">
        <div className="stat-item">
          <span className="stat-label">Total Issues</span>
          <span className="stat-value">1,247</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active Today</span>
          <span className="stat-value">42</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg. Resolution</span>
          <span className="stat-value">2.3 days</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;