import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, AlertTriangle, Trash2, HardHat, PenTool, Trees, Car, UtilityPole, HelpCircle } from 'lucide-react';

const AnalysisResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isReported, setIsReported] = useState(false);

  // Alphabetical order matching Python CLASSES exactly
  const labels = [
    "Damaged Electrical Pole",
    "Fallen Tree",
    "Garbage",
    "Graffiti",
    "Illegal Parking",
    "Pothole"
  ];

  const classMetadata = {
    "Garbage": { icon: <Trash2 size={32} />, color: "#f97316", bg: "#fff7ed", desc: "uncollected waste or overflow." },
    "Pothole": { icon: <HardHat size={32} />, color: "#ef4444", bg: "#fef2f2", desc: "road surface damage creating a hazard." },
    "Graffiti": { icon: <PenTool size={32} />, color: "#8b5cf6", bg: "#f5f3ff", desc: "unauthorized markings on public property." },
    "Fallen Tree": { icon: <Trees size={32} />, color: "#10b981", bg: "#ecfdf5", desc: "vegetation blocking pathways." },
    "Illegal Parking": { icon: <Car size={32} />, color: "#3b82f6", bg: "#eff6ff", desc: "vehicle obstructing traffic." },
    "Damaged Electrical Pole": { icon: <UtilityPole size={32} />, color: "#eab308", bg: "#fefce8", desc: "damage to power infrastructure." },
    "Unclear": { icon: <HelpCircle size={32} />, color: "#64748b", bg: "#f1f5f9", desc: "The AI is unsure. Please provide a clearer photo." }
  };

  if (!state || !state.predictions) return <div style={{ padding: '50px', textAlign: 'center' }}>No Analysis Data Found. Please upload again.</div>;

  const { image, predictions, location } = state;

  // Map and sort predictions
  // Map and sort predictions - added a safety check for predictions
const sorted = (predictions && Array.isArray(predictions) ? predictions : [])
  .map((prob, i) => ({ prob, name: labels[i] }))
  .sort((a, b) => b.prob - a.prob);

// If predictions array is empty or wrong, show error
if (sorted.length === 0) return <div style={{ padding: '50px', textAlign: 'center' }}>Invalid Prediction Data.</div>;

  // LOGIC: Check if the best prediction meets a minimum confidence threshold
  // Based on your training script's 0.7 threshold, we use 0.5 for UX flexibility
  const isConfident = sorted[0].prob >= 0.50;
  
  const topIssue = isConfident ? sorted[0].name : "Unclear Detection";
  const confidence = (sorted[0].prob * 100).toFixed(0);
  const secondIssue = sorted[1].name;
  const secondConfidence = (sorted[1].prob * 100).toFixed(0);
  
  // Use metadata for detected issue, or "Unclear" if below threshold
  const meta = isConfident ? (classMetadata[topIssue] || classMetadata["Garbage"]) : classMetadata["Unclear"];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Top Banner */}
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: isConfident ? '#0369a1' : '#64748b', color: 'white', padding: '12px 20px', borderRadius: '12px' }}>
          {isConfident ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
          <span style={{ fontWeight: '700' }}>{isConfident ? 'AI Analysis Result' : 'Low Confidence Detection'}</span>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '0 20px' }}>
        {/* Left: Image */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
            <img src={image} alt="Source" style={{ width: '100%', filter: isConfident ? 'none' : 'grayscale(30%)' }} />
            {isConfident && (
              <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', border: `4px solid ${meta.color}`, borderRadius: '20px', boxShadow: `0 0 0 1000px rgba(0,0,0,0.3)` }} />
            )}
          </div>
          <div style={{ marginTop: '15px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', color: '#475569' }}>
            <MapPin size={16} /> {location?.address || "Location not available"}
          </div>
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ background: meta.bg, color: meta.color, padding: '15px', borderRadius: '15px' }}>{meta.icon}</div>
              <div>
                <h2 style={{ margin: 0, color: '#1e293b' }}>{topIssue}</h2>
                <span style={{ color: '#3b82f6', fontSize: '14px' }}>{isConfident ? 'Verified Detection' : 'AI Processing Hint'}</span>
              </div>
            </div>

            <div style={{ fontWeight: '800', color: meta.color, marginBottom: '10px' }}>{confidence}% Match</div>
            <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${confidence}%`, height: '100%', background: meta.color, borderRadius: '5px', transition: 'width 1s ease-in-out' }} />
            </div>
            
            <p style={{ marginTop: '20px', fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
               {isConfident ? `${meta.desc} Geotagged for council records.` : "The AI isn't confident enough to auto-categorize this. Please check the image quality or select the category manually."}
            </p>
          </div>

          {/* Secondary Prediction - Only show if it's a close second */}
          {isConfident && secondConfidence > 20 && (
            <div style={{ background: '#fffbeb', padding: '20px', borderRadius: '24px', border: '1px solid #fef3c7' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#92400e', marginBottom: '4px', textTransform: 'uppercase' }}>Possible Secondary Issue</div>
              <div style={{ fontWeight: '700', color: '#92400e' }}>{secondIssue} ({secondConfidence}%)</div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ padding: '20px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '24px', textAlign: 'center' }}>
            <button 
              disabled={!isConfident || isReported}
              onClick={() => setIsReported(true)} 
              style={{ 
                width: '100%', 
                background: isConfident ? '#10b981' : '#94a3b8', 
                color: 'white', 
                padding: '16px', 
                borderRadius: '12px', 
                fontWeight: '700',
                border: 'none',
                cursor: isConfident ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              {isReported ? "Report Successfully Dispatched" : isConfident ? "Confirm & Dispatch Report" : "Detection Too Weak to Report"}
            </button>
            <button 
              onClick={() => navigate(-1)} 
              style={{ marginTop: '15px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}
            >
              Try Different Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;