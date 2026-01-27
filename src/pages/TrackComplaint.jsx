import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, CheckCircle2, 
  CircleDot, AlertCircle, ChevronLeft, Building2, ExternalLink, Camera, Loader2, XCircle 
} from 'lucide-react';

const TrackComplaint = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const colors = {
    primary: '#0086C9',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#f43f5e',
    textMain: '#101828',
    textSecondary: '#667085',
    border: '#EAECF0',
    bgLight: '#F9FAFB'
  };

  const fetchComplaints = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedAuthEmail = localStorage.getItem('authUserEmail');
      let userEmail = "";

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          userEmail = parsed.email || parsed;
        } catch (e) {
          userEmail = storedUser; 
        }
      } else if (storedAuthEmail) {
        userEmail = storedAuthEmail;
      }

      if (!userEmail) {
        setError("User session not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/citizen/reports/${userEmail}`);

      if (!response.ok) {
        const fallbackRes = await fetch('http://127.0.0.1:8000/authority/reports/');
        if (!fallbackRes.ok) throw new Error(`Server responded with ${fallbackRes.status}`);
        const allData = await fallbackRes.json();
        const filteredData = allData.filter(report => 
          report.user_email === userEmail || report.email === userEmail
        );
        setComplaints(filteredData);
      } else {
        const data = await response.json();
        setComplaints(Array.isArray(data) ? data : []);
      }
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load reports. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
    const interval = setInterval(fetchComplaints, 15000); 
    return () => clearInterval(interval);
  }, [fetchComplaints]);

  // --- Logic to Handle Image Selection & Upload ---
  const triggerFilePicker = (id) => {
    setSelectedComplaintId(id);
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedComplaintId) return;

    setUploading(true);

    // Convert Image to Base64 to store in Database
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        const response = await fetch(`http://127.0.0.1:8000/authority/reports/update/${selectedComplaintId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: 'Pending Closure',
            resolved_image: base64Image, // Sending the proof photo
            is_rejection: false 
          }) 
        });

        if (response.ok) {
          alert("Evidence photo submitted! The Authority will now verify it to close the issue.");
          fetchComplaints();
        } else {
          throw new Error("Failed to update");
        }
      } catch (err) {
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false);
        setSelectedComplaintId(null);
      }
    };
  };

  const getTimelineSteps = (status) => {
    const s = status?.toLowerCase() || '';
    return [
      { label: 'Submitted', isDone: true, desc: 'Report received' },
      { label: 'In Progress', isDone: s !== 'pending', desc: 'Crew dispatched' },
      { label: 'Resolved', isDone: ['resolved', 'pending closure', 'closed'].includes(s), desc: 'Work finished' },
      { label: 'Closed', isDone: s === 'closed', desc: 'Verified & Archived' }
    ];
  };

  return (
    <div style={{ background: colors.bgLight, minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Hidden File Input for Image Proof */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <button 
              onClick={() => navigate('/citizen-portal')} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', marginBottom: '12px', fontWeight: '500' }}
            >
              <ChevronLeft size={18} /> Back to Dashboard
            </button>
            <h1 style={{ fontSize: '30px', fontWeight: '700', color: colors.textMain, margin: 0 }}>My Reported Issues</h1>
          </div>
          <Building2 size={40} color={colors.primary} style={{ opacity: 0.2 }} />
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} size={20} />
          <input 
            type="text"
            placeholder="Search my reports by ID or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '14px', border: `1px solid ${colors.border}`, fontSize: '16px', outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px' }}>
            <Loader2 className="animate-spin" size={40} color={colors.primary} style={{ margin: '0 auto' }} />
            <p style={{ marginTop: '16px', color: colors.textSecondary }}>Loading your reports...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', background: '#FEF2F2', borderRadius: '16px', border: '1px solid #FEE2E2' }}>
            <AlertCircle color={colors.danger} size={32} style={{ margin: '0 auto 12px' }} />
            <p style={{ color: '#991B1B', fontWeight: '500' }}>{error}</p>
            <button onClick={fetchComplaints} style={{ marginTop: '12px', color: colors.primary, background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Try Again</button>
          </div>
        ) : complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: `1px solid ${colors.border}` }}>
            <CircleDot size={48} color={colors.textSecondary} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
            <h3 style={{ color: colors.textMain, marginBottom: '8px' }}>No reports found</h3>
            <p style={{ color: colors.textSecondary }}>You haven't submitted any civic issues yet.</p>
          </div>
        ) : (
          complaints
            .filter(c => 
              (c.ref_number || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
              (c.ai_prediction || "").toLowerCase().includes(searchQuery.toLowerCase())
            )
            .reverse()
            .map((complaint) => {
              const status = complaint.status?.toLowerCase() || 'pending';
              const isRejected = complaint.status?.toLowerCase() === 'resolved' && complaint.resolved_image != null;

              return (
                <div key={complaint.id} style={{ background: 'white', borderRadius: '20px', border: `1px solid ${colors.border}`, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                  
                  {/* Card Header */}
                  <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '700', fontSize: '18px', color: colors.textMain }}>{complaint.ai_prediction || "General Issue"}</span>
                        <span style={{ 
                          background: status === 'closed' ? '#ECFDF3' : status === 'resolved' ? '#FEF3C7' : '#EFF8FF', 
                          color: status === 'closed' ? colors.success : status === 'resolved' ? '#B45309' : colors.primary, 
                          fontSize: '11px', padding: '4px 10px', borderRadius: '12px', fontWeight: '800', textTransform: 'uppercase'
                        }}>
                          {complaint.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: colors.textSecondary }}>
                        <span style={{ fontWeight: '600' }}>ID: {complaint.ref_number}</span>
                        <span>•</span>
                        <span>{complaint.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', padding: '24px' }}>
                    
                    {/* Timeline Column */}
                    <div>
                      <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: colors.textSecondary, letterSpacing: '0.05em', marginBottom: '20px' }}>Resolution Path</h4>
                      {getTimelineSteps(complaint.status).map((step, idx, arr) => (
                        <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '20px', position: 'relative' }}>
                          {idx !== arr.length - 1 && (
                            <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-20px', width: '2px', background: step.isDone ? colors.success : colors.border }} />
                          )}
                          <div style={{ zIndex: 1, background: 'white' }}>
                            {step.isDone ? <CheckCircle2 size={22} color={colors.success} /> : <CircleDot size={22} color={colors.textSecondary} style={{ opacity: 0.3 }} />}
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '14px', color: step.isDone ? colors.textMain : colors.textSecondary }}>{step.label}</div>
                            <div style={{ fontSize: '12px', color: colors.textSecondary }}>{step.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Column */}
                    <div style={{ 
                      background: colors.bgLight, 
                      borderRadius: '16px', padding: '20px', 
                      border: `1px solid ${colors.border}`, 
                      display: 'flex', flexDirection: 'column', justifyContent: 'center' 
                    }}>
                      {status === 'resolved' ? (
                        <div style={{ textAlign: 'center' }}>
                          <Camera size={32} color={colors.warning} style={{ margin: '0 auto 12px' }} />
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: colors.textMain }}>Proof Required</h4>
                          <p style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '16px', lineHeight: '1.5' }}>
                            Work is reported as finished. Please upload a photo of the fixed area to close this report.
                          </p>
                          <button 
                            onClick={() => triggerFilePicker(complaint.id)}
                            disabled={uploading}
                            style={{ 
                              width: '100%', padding: '12px', 
                              background: colors.primary, 
                              color: 'white', border: 'none', borderRadius: '10px', 
                              fontWeight: '600', cursor: 'pointer', display: 'flex', 
                              alignItems: 'center', justifyContent: 'center', gap: '8px' 
                            }}
                          >
                            {uploading && selectedComplaintId === complaint.id ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              <><Camera size={18} /> Upload Proof Photo</>
                            )}
                          </button>
                        </div>
                      ) : status === 'pending closure' ? (
                        <div style={{ textAlign: 'center' }}>
                          <Loader2 className="animate-spin" size={32} color={colors.primary} style={{ margin: '0 auto 12px' }} />
                          <h4 style={{ margin: '0 0 8px 0', color: colors.textMain }}>Verifying Proof</h4>
                          <p style={{ fontSize: '12px', color: colors.textSecondary }}>Authority is reviewing your uploaded photo.</p>
                        </div>
                      ) : status === 'closed' ? (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ background: '#ECFDF3', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                            <CheckCircle2 size={24} color={colors.success} />
                          </div>
                          <h4 style={{ margin: '0 0 4px 0', color: colors.textMain }}>Success!</h4>
                          <p style={{ fontSize: '12px', color: colors.textSecondary }}>This issue is permanently closed.</p>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', opacity: 0.6 }}>
                          <CircleDot size={32} color={colors.textSecondary} style={{ margin: '0 auto 12px' }} />
                          <h4 style={{ margin: '0 0 8px 0' }}>Processing</h4>
                          <p style={{ fontSize: '12px', color: colors.textSecondary }}>Assigned to: {complaint.department}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;