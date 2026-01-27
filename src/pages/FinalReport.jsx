import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, CheckCircle, Printer, Download, Building2, 
  ChevronLeft, Send, ShieldCheck
} from 'lucide-react';

const FinalReport = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [refNumber, setRefNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportData = state || {
    predictions: { label: "Garbage Overflow", confidence: 92 },
    userSeverity: "Medium",
    finalLocation: { address: "MG Road, Sector 14, Bangalore", lat: 12.9716, lng: 77.5946 },
    assignedDepartment: "Municipal Solid Waste Department",
    userDescription: "Accumulated garbage and waste materials creating unhygienic conditions.",
    image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=400"
  };

  useEffect(() => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    setRefNumber(`CVC-2026-BLR-${randomId}`);
    
    // Set current date/time dynamically
    const now = new Date();
    setCurrentDate(now.toLocaleString('en-IN', { 
      day: '2-digit', month: 'long', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    }));
  }, []);

  // --- UPDATED: DYNAMIC MAPPING LOGIC ---
  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    
    const userEmail = localStorage.getItem("authUserEmail");
    
    if (!userEmail) {
      alert("User session not found. Please log in again.");
      navigate('/citizen-login');
      return;
    }

    // Determine the exact department name used by the Authority Dashboard
    const getTargetDepartment = (label, currentDept) => {
      const issue = label.toLowerCase();
      if (issue.includes('garbage') || issue.includes('waste')) return 'Garbage';
      if (issue.includes('electricity') || issue.includes('light') || issue.includes('pole')) return 'Electricity';
      if (issue.includes('water') || issue.includes('leak') || issue.includes('sewage')) return 'Water';
      if (issue.includes('road') || issue.includes('pothole')) return 'Roads';
      return currentDept; // Fallback to whatever was passed in state
    };

    const payload = {
      email: userEmail,
      ref_number: refNumber,
      issue: reportData.predictions.label,
      address: reportData.finalLocation.address,
      // We map the department name here so the Authority Dashboard finds it
      department: getTargetDepartment(reportData.predictions.label, reportData.assignedDepartment),
      severity: reportData.userSeverity,
      image_url: reportData.image,
      lat: reportData.finalLocation.lat,
      lng: reportData.finalLocation.lng
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/submit-final-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        navigate('/submission-success'); 
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || "Submission failed"}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Could not connect to the server. Ensure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => window.print();

  const styles = {
    container: { backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
    nav: { backgroundColor: 'white', borderBottom: '1px solid #EAECF0', padding: '16px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    reportCard: { backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.08)', border: '1px solid #EAECF0' },
    headerGradient: { background: 'linear-gradient(90deg, #1570EF 0%, #0694A2 100%)', padding: '32px 40px', color: 'white' },
    label: { color: '#667085', fontSize: '12px', fontWeight: '500', marginBottom: '4px' },
    value: { color: '#101828', fontSize: '14px', fontWeight: '600' },
    sectionTitle: { fontSize: '12px', fontWeight: '700', color: '#101828', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' },
    secondaryBtn: { padding: '8px 14px', borderRadius: '8px', border: '1px solid #D0D5DD', background: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#344054' },
    primaryBtn: { padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0086C9', color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: isSubmitting ? 0.7 : 1 }
  };

  return (
    <div style={styles.container}>
      <style>
        {`@media print { .no-print { display: none !important; } body { background: white !important; } }`}
      </style>

      <nav style={styles.nav} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#0086C9', color: 'white', padding: '8px', borderRadius: '8px' }}><Building2 size={20} /></div>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#101828' }}>CivicAI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={handlePrint} style={styles.secondaryBtn}><Printer size={18} /> Print</button>
            <button onClick={handlePrint} style={styles.primaryBtn}><Download size={18} /> Download PDF</button>
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }} className="no-print">
            <div style={{ background: '#0086C9', color: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle size={24} />
            </div>
            <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#101828' }}>Review & Submit Report</h1>
            <p style={{ color: '#667085' }}>Please review the official report details before final submission.</p>
        </div>

        <div style={styles.reportCard}>
          <div style={styles.headerGradient}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '8px' }}><Building2 size={24} /></div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>CivicAI Platform</h2>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>AI-Powered Civic Issue Reporting</p>
                    </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Official Report</div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '24px 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase' }}># Reference Number</div>
                    <div style={{ fontWeight: '600', fontSize: '16px' }}>{refNumber}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase' }}>Date & Time</div>
                    <div style={{ fontWeight: '600', fontSize: '16px' }}>{currentDate}</div>
                </div>
            </div>
          </div>

          <div style={{ padding: '40px' }}>
            <div style={{ marginBottom: '32px' }}>
                <p style={{ margin: 0, color: '#101828', fontWeight: '700' }}>To,</p>
                <p style={{ margin: 0, color: '#101828', fontWeight: '700', fontSize: '16px' }}>{reportData.assignedDepartment}</p>
                <p style={{ margin: 0, color: '#475467' }}>Municipal Corporation Office</p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #1570EF', marginBottom: '32px' }}>
                <span style={{ fontWeight: '600', color: '#475467' }}>Subject: </span>
                <span style={{ fontWeight: '700', color: '#101828' }}>Complaint regarding {reportData.predictions.label}</span>
            </div>

            <div style={{ color: '#475467', lineHeight: '1.6', fontSize: '15px' }}>
                <p>Dear Sir/Madam,</p>
                <p>This report has been generated via CivicAI to notify your department of a pressing issue at the following location:</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#F9FAFB', padding: '24px', borderRadius: '12px', margin: '24px 0', border: '1px solid #EAECF0' }}>
                    <div>
                        <div style={styles.label}>Issue Type</div>
                        <div style={styles.value}>{reportData.predictions.label}</div>
                    </div>
                    <div>
                        <div style={styles.label}>Severity Level</div>
                        <div style={{...styles.value, display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
                            {reportData.userSeverity} <span style={{ backgroundColor: '#FFFAEB', color: '#B54708', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>Verified</span>
                        </div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <div style={styles.label}>Location</div>
                        <div style={styles.value}>{reportData.finalLocation.address}</div>
                    </div>
                </div>

                <p><strong>User Description:</strong> <i>{reportData.userDescription}</i></p>
                <p>Photographic evidence is attached below. We request you to initiate resolution procedures.</p>
                <p style={{ marginTop: '24px' }}>Sincerely,<br/><strong>Concerned Citizen (CivicAI Platform)</strong></p>
            </div>

            <div style={{ height: '1px', background: '#EAECF0', margin: '40px 0' }}></div>

            <div style={styles.sectionTitle}><FileText size={16}/> Attached Evidence</div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #EAECF0' }}>
                <img src={reportData.image} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} alt="Evidence" />
                <div>
                    <div style={{ fontWeight: '700', color: '#101828', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Visual Evidence <span style={{ background: '#EFF8FF', color: '#175CD3', fontSize: '11px', padding: '2px 8px', borderRadius: '12px' }}>AI Analyzed</span>
                    </div>
                    <div style={{ color: '#667085', fontSize: '13px', marginTop: '4px' }}>AI Confidence: {reportData.predictions.confidence}%</div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '40px', background: '#F5FAFF', padding: '16px', borderRadius: '12px', border: '1px solid #D1E9FF' }}>
                <ShieldCheck size={20} color="#1570EF" />
                <div style={{ fontSize: '12px', color: '#175CD3' }}>
                    <strong>Legal Notice:</strong> This report is filed under official civic guidelines. Providing false information may lead to account suspension.
                </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }} className="no-print">
            <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #D0D5DD', background: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <ChevronLeft size={18}/> Back
            </button>
            <button 
                onClick={handleFinalSubmission} 
                disabled={isSubmitting}
                style={styles.primaryBtn}
            >
                {isSubmitting ? "Processing..." : "Submit to Authority"} <Send size={18}/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FinalReport;