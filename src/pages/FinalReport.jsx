import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, MapPin, CheckCircle, Calendar, Hash, 
  ShieldCheck, Printer, Download, Globe, Building2, 
  ChevronLeft, Send, Search
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
    setCurrentDate("06 January 2026 at 11:14 am"); 
  }, []);

  // --- NEW: AUTOMATED SUBMISSION LOGIC ---
  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    
    // 1. Retrieve the PostgreSQL user data we saved in Login.jsx
    const userEmail = localStorage.getItem("authUserEmail");
    
    if (!userEmail) {
    alert("User session not found. Please log in again.");
    navigate('/citizen-login'); // This matches your App.jsx
    return;
}

    // 2. Prepare the data for the backend
    const payload = {
        email: userEmail,
        ref_number: refNumber,
        issue: reportData.predictions.label,
        address: reportData.finalLocation.address,
        department: reportData.assignedDepartment,
        severity: reportData.userSeverity
    };

    try {
        // 3. Call the FastAPI endpoint to save and trigger Gmail
        const response = await fetch("http://127.0.0.1:8000/submit-final-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
    // No alert! Just navigate to the new success page
    navigate('/submission-success'); 
}
        else {
            const errorData = await response.json();
            alert(`Error: ${errorData.detail || "Submission failed"}`);
        }
    } catch (error) {
        console.error("Submission Error:", error);
        alert("Could not connect to the server. Please check if the backend is running.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
        {`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            main { margin: 0 !important; padding: 0 !important; max-width: 100% !important; }
            div[style*="reportCard"] { border: none !important; box-shadow: none !important; }
          }
        `}
      </style>

      <nav style={styles.nav} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#0086C9', color: 'white', padding: '8px', borderRadius: '8px' }}><Building2 size={20} /></div>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#101828' }}>CivicAI</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={handlePrint} style={styles.secondaryBtn}>
                <Printer size={18} /> Print
            </button>
            <button onClick={handlePrint} style={styles.primaryBtn}>
                <Download size={18} /> Download PDF
            </button>
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }} className="no-print">
            <div style={{ background: '#0086C9', color: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle size={24} />
            </div>
            <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#101828' }}>Review & Submit Report</h1>
            <p style={{ color: '#667085' }}>Please review the auto-generated report before submitting it to the concerned authority.</p>
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
                <p style={{ margin: 0, color: '#475467' }}>Local Jurisdiction Area</p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #1570EF', marginBottom: '32px' }}>
                <span style={{ fontWeight: '600', color: '#475467' }}>Subject: </span>
                <span style={{ fontWeight: '700', color: '#101828' }}>Complaint regarding {reportData.predictions.label} at {reportData.finalLocation.address.split(',')[0]}</span>
            </div>

            <div style={{ color: '#475467', lineHeight: '1.6', fontSize: '15px' }}>
                <p>Dear Sir/Madam,</p>
                <p>This is to bring to your kind attention that I have observed a civic issue requiring immediate action. Through the CivicAI platform, I am reporting the following:</p>

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
                    <div>
                        <div style={styles.label}>Location</div>
                        <div style={styles.value}>{reportData.finalLocation.address}</div>
                    </div>
                    <div>
                        <div style={styles.label}>AI Confidence</div>
                        <div style={{ color: '#039855', fontWeight: '600', fontSize: '14px' }}>{reportData.predictions.confidence}% verified</div>
                    </div>
                </div>

                <p>The issue was detected on <strong>{currentDate}</strong> at the above-mentioned location. Additional details: <i>{reportData.userDescription}</i></p>
                <p>I request your office to kindly take necessary action to resolve this civic issue at the earliest. Photographic evidence and location details are attached with this complaint for your reference.</p>
                <p style={{ marginTop: '32px' }}>Thank you for your attention to this matter.</p>
                <p style={{ marginTop: '24px' }}>Sincerely,<br/><strong>Concerned Citizen (CivicAI User)</strong></p>
            </div>

            <div style={{ height: '1px', background: '#EAECF0', margin: '40px 0' }}></div>

            <div style={styles.sectionTitle}><FileText size={16}/> Attached Evidence</div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #EAECF0', marginBottom: '32px' }}>
                <img src={reportData.image} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} alt="Evidence" />
                <div>
                    <div style={{ fontWeight: '700', color: '#101828', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Photo Evidence <span style={{ background: '#EFF8FF', color: '#175CD3', fontSize: '11px', padding: '2px 8px', borderRadius: '12px' }}>Analyzed by AI</span>
                    </div>
                    <div style={{ color: '#667085', fontSize: '13px', marginTop: '4px' }}>Captured: {currentDate}</div>
                </div>
            </div>

            <div style={styles.sectionTitle}><Building2 size={16}/> Department Routing</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ECFDF3', padding: '16px 20px', borderRadius: '12px', border: '1px solid #ABEFC6' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '8px', borderRadius: '8px', color: '#039855' }}><Building2 size={20} /></div>
                    <div>
                        <div style={{ fontWeight: '700', color: '#101828' }}>{reportData.assignedDepartment}</div>
                        <div style={{ fontSize: '12px', color: '#067647' }}>Department selected automatically based on issue type</div>
                    </div>
                </div>
                <div style={{ background: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: '700', color: '#039855', border: '1px solid #ABEFC6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', background: '#039855', borderRadius: '50%' }}></div> Ready for Submission
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '40px', background: '#F5FAFF', padding: '16px', borderRadius: '12px', border: '1px solid #D1E9FF' }}>
                <ShieldCheck size={20} color="#1570EF" />
                <div style={{ fontSize: '12px', color: '#175CD3' }}>
                    <strong>Legal Notice:</strong> By submitting this report, you acknowledge that the information is accurate and will be officially shared with the concerned authority. This complaint will be recorded in the municipal database.
                </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }} className="no-print">
            <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #D0D5DD', background: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <ChevronLeft size={18}/> Edit Report Details
            </button>
            <button 
                onClick={handleFinalSubmission} 
                disabled={isSubmitting}
                style={styles.primaryBtn}
            >
                {isSubmitting ? "Submitting..." : "Submit to Authority"} <Send size={18}/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FinalReport;