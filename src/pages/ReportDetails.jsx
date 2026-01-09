import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // CRUCIAL for map styling
import { 
  MapPin, ChevronLeft, Send, Trash2, CheckCircle, 
  Info, Globe, HardHat, PenTool, Trees, Car, UtilityPole, Building2 
} from 'lucide-react';

// FIX: Leaflet marker icon fix for React/Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ReportDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");

  // --- FREE MAP STATE ---
  const [currentPos, setCurrentPos] = useState({
    lat: state?.location?.lat || 20.5937,
    lng: state?.location?.lng || 78.9629
  });
  const [readableAddress, setReadableAddress] = useState(state?.location?.address || "Locating...");

  // Reverse Geocoding: Converts Lat/Lng to Human Readable Address (Free Service)
  const updateAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.display_name) {
        setReadableAddress(data.display_name);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  // Internal Component to handle Marker dragging and Map clicks
  function DraggableMarker() {
    const map = useMapEvents({
      click(e) {
        setCurrentPos(e.latlng);
        updateAddress(e.latlng.lat, e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
      }
    });

    return (
      <Marker
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            setCurrentPos(position);
            updateAddress(position.lat, position.lng);
          },
        }}
        position={currentPos}
      />
    );
  }

  if (!state) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', textAlign: 'center', maxWidth: '400px', border: '1px solid #F1F5F9' }}>
          <Info size={32} color="#EF4444" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Data Lost</h2>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', backgroundColor: '#2563EB', color: 'white', borderRadius: '16px', border: 'none', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const { image, predictions } = state;
  const currentLabel = predictions.label || "Issue";

  const designConfig = {
    "Garbage": { icon: <Trash2 size={32} />, dept: "Municipal Solid Waste Department", color: "#F97316", bg: "#FFF7ED" },
    "Pothole": { icon: <HardHat size={32} />, dept: "Roads & Infrastructure Dept", color: "#EF4444", bg: "#FEF2F2" },
    "Graffiti": { icon: <PenTool size={32} />, dept: "Public Property Maintenance", color: "#8B5CF6", bg: "#F5F3FF" },
    "FallenTree": { icon: <Trees size={32} />, dept: "Parks & Recreation Dept", color: "#10B981", bg: "#ECFDF5" },
    "IllegalParking": { icon: <Car size={32} />, dept: "Traffic Police Department", color: "#3B82F6", bg: "#EFF6FF" },
    "DamagedElectricalPole": { icon: <UtilityPole size={32} />, dept: "Electricity Board", color: "#EAB308", bg: "#FEFCE8" }
  };

  const active = designConfig[currentLabel] || designConfig["Garbage"];

  // UPDATED: This now navigates to the final report page with all data
  const handleFinalSubmit = () => {
    const finalReport = {
      ...state,
      userDescription: description,
      userSeverity: severity,
      assignedDepartment: active.dept,
      finalLocation: { 
        address: readableAddress, 
        lat: currentPos.lat, 
        lng: currentPos.lng 
      },
      timestamp: new Date().toISOString()
    };
    
    // Pass the data to the FinalReport page
    navigate('/final-report', { state: finalReport });
  };

  const styles = {
    card: { background: 'white', borderRadius: '32px', border: '1px solid #F1F5F9', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px' },
    label: { fontWeight: 'bold', color: '#1E293B', marginBottom: '16px', display: 'block' },
    input: { width: '100%', padding: '20px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '24px', outline: 'none', fontFamily: 'inherit' }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'sans-serif', paddingBottom: '64px' }}>
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #F1F5F9', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ backgroundColor: '#2563EB', padding: '6px', borderRadius: '8px', color: 'white', display: 'flex' }}><Globe size={20} /></div>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1E293B' }}>CivicAI</span>
        </div>
      </nav>

      <main style={{ maxWidth: '768px', margin: '48px auto 0', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#EFF6FF', color: '#2563EB', borderRadius: '24px', marginBottom: '16px' }}><Send size={28} /></div>
          <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#1E293B', margin: 0 }}>Report Details</h1>
        </div>

        {/* Section 1: AI Result & Assigned Department */}
        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '20px' }}>
            <CheckCircle size={16} /> AI Verification Successful
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ backgroundColor: active.bg, color: active.color, padding: '20px', borderRadius: '22px' }}>{active.icon}</div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1E293B', margin: 0 }}>
                  {currentLabel.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '14px', marginTop: '6px' }}>
                   <Building2 size={16} />
                   <span style={{ fontWeight: '600' }}>Assigned Department: {active.dept}</span>
                </div>
              </div>
            </div>
            <img src={image} alt="Preview" style={{ width: '96px', height: '96px', borderRadius: '16px', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
          </div>
        </div>

        {/* Section 2: Severity */}
        <div style={styles.card}>
          <span style={styles.label}>Select Severity Level</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {['Low', 'Medium', 'High'].map((lvl) => (
              <div 
                key={lvl}
                onClick={() => setSeverity(lvl)}
                style={{ 
                  padding: '20px', borderRadius: '24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                  border: `2px solid ${severity === lvl ? '#2563EB' : '#F1F5F9'}`,
                  backgroundColor: severity === lvl ? '#EFF6FF' : '#F8FAFC'
                }}
              >
                <span style={{ fontWeight: '900', color: severity === lvl ? '#2563EB' : '#64748B' }}>{lvl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Interactive FREE Map */}
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold', color: '#1E293B' }}>Incident Location</span>
            <span style={{ color: '#2563EB', fontSize: '12px', fontWeight: 'bold' }}>DRAG PIN TO ADJUST</span>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#2563EB', color: 'white', padding: '12px', borderRadius: '16px' }}><MapPin size={24} /></div>
              <div>
                <p style={{ fontWeight: '900', color: '#1E293B', margin: 0, fontSize: '16px', lineHeight: '1.4' }}>{readableAddress}</p>
                <p style={{ color: '#94A3B8', fontSize: '12px', margin: '4px 0 0' }}>{currentPos.lat.toFixed(4)}°N, {currentPos.lng.toFixed(4)}°E</p>
              </div>
            </div>
            
            <div style={{ height: '300px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #E2E8F0', zIndex: 1 }}>
              <MapContainer center={[currentPos.lat, currentPos.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker />
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Section 4: Description */}
        <div style={styles.card}>
          <span style={styles.label}>Additional Context (Optional)</span>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide any details that might help the department..."
            style={{ ...styles.input, height: '140px', resize: 'none' }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => navigate(-1)} style={{ flex: 1, padding: '20px', borderRadius: '24px', border: '1px solid #E2E8F0', backgroundColor: 'white', fontWeight: '900', color: '#64748B', cursor: 'pointer' }}>
            GO BACK
          </button>
          <button onClick={handleFinalSubmit} style={{ flex: 2.5, padding: '20px', borderRadius: '24px', border: 'none', background: 'linear-gradient(90deg, #0066FF 0%, #00D1FF 100%)', color: 'white', fontWeight: '900', cursor: 'pointer' }}>
            SUBMIT TO DEPARTMENT
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReportDetails;