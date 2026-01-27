import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Building2, X, MapPin, ExternalLink, ShieldCheck, FileText, Info, Clock, AlertCircle, Loader2 } from 'lucide-react';
import IssueTable from './IssueTable';

const css = `
  .dashboard-container { background: #f8fafc; min-height: 100vh; font-family: sans-serif; }
  .header-card { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2.5rem 2rem; color: white; border-radius: 0 0 2rem 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
  
  .filter-bar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid #e2e8f0; border-radius: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
  .search-input { background: #f1f5f9; border: 1px solid transparent; transition: all 0.2s; border-radius: 0.75rem; }
  .search-input:focus { background: white; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }

  .modal-overlay { 
    background: rgba(15, 23, 42, 0.85); 
    backdrop-filter: blur(8px); 
    position: fixed; 
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 9999; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 2rem; 
  }

  .modal-content { 
    background: white; 
    width: 100%; 
    max-width: 1100px; 
    border-radius: 2rem; 
    overflow: hidden; 
    display: flex; 
    flex-direction: row; 
    height: 85vh; 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); 
  }

  .modal-visual-side { 
    flex: 1.3; 
    background: #1e293b; 
    display: flex; 
    flex-direction: column; 
    padding: 2.5rem;
  }

  .image-container { 
    flex-grow: 1; 
    width: 100%;
    margin: 1.5rem 0;
    border-radius: 1.5rem; 
    border: 1px solid rgba(255,255,255,0.1);
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .image-container img { max-width: 100%; max-height: 100%; object-fit: contain; }

  .prediction-box {
    background: rgba(255, 255, 255, 0.08);
    padding: 1.5rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .white-text-force {
    color: #FFFFFF !important;
    opacity: 1 !important;
  }

  .modal-info-side { flex: 1; padding: 2.5rem; overflow-y: auto; background: white; display: flex; flex-direction: column; }
  .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1.25rem; padding: 1.25rem; margin-bottom: 1.25rem; }
  .info-label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
  .info-value { font-size: 0.95rem; font-weight: 600; color: #1e293b; }

  .btn-update {
    background: #2563eb;
    color: white;
    font-weight: 700;
    padding: 1.25rem;
    border-radius: 1rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: auto;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    color: #64748b;
  }
`;

export default function IssueList({ department: propDepartment }) {
  const [allIssues, setAllIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback to localStorage if prop is missing (common in refresh scenarios)
  const activeDepartment = propDepartment || localStorage.getItem("authDept") || "Electricity";

  const fetchIssues = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authority/reports/${encodeURIComponent(activeDepartment)}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAllIssues(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchIssues();
    const interval = setInterval(fetchIssues, 5000);
    return () => clearInterval(interval);
  }, [activeDepartment]);

  // ROBUST FILTER LOGIC
  const filteredIssues = allIssues.filter(issue => {
    const matchesSearch = (issue.ref_number || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    // Exact match for "All Statuses", otherwise case-insensitive comparison
    const matchesStatus = 
      statusFilter === 'All Statuses' || 
      (issue.status && issue.status.toLowerCase() === statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      <style>{css}</style>

      {/* Header */}
      <div className="header-card mb-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-500/20 rounded-2xl backdrop-blur-md">
                <Building2 className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white">Authority Command</h1>
            </div>
            <p className="text-blue-200/70 text-sm ml-1">
                Live tracking for <span className="text-white font-bold">{activeDepartment} Department</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12">
        <div className="filter-bar p-6 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <input 
                type="text"
                placeholder="Find by Reference ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 search-input text-sm font-medium"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-3.5 bg-slate-100 border-none rounded-xl text-sm font-bold text-slate-700 cursor-pointer"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {isLoading && allIssues.length === 0 ? (
          <div className="loading-state bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="font-bold text-slate-900">Synchronizing with Secure Server...</p>
            <p className="text-xs text-slate-400 mt-1">Fetching latest reports for {activeDepartment}</p>
          </div>
        ) : (
          <IssueTable 
            issues={filteredIssues} 
            onIssueClick={(issue) => setSelectedIssue(issue)} 
            onRefresh={fetchIssues} 
          />
        )}
      </div>

      {/* Modal Section */}
      {selectedIssue && (
        <div className="modal-overlay" onClick={() => setSelectedIssue(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-visual-side">
              <div>
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest opacity-70">Case Profile</span>
                <div className="flex justify-between items-center">
                   <h2 className="text-3xl font-black text-white tracking-tight">{selectedIssue.ref_number}</h2>
                   <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    <span className="text-[9px] font-black text-blue-400 uppercase">AI Verified</span>
                  </div>
                </div>
              </div>

              <div className="image-container">
                {selectedIssue.image_url ? (
                  <img src={selectedIssue.image_url} alt="Evidence" />
                ) : (
                  <div className="flex flex-col items-center text-white/20">
                    <FileText className="w-12 h-12" />
                    <span className="text-[10px] font-bold mt-2">NO VISUAL DATA</span>
                  </div>
                )}
              </div>
              
              <div className="prediction-box">
                <p className="white-text-force text-[10px] font-bold uppercase tracking-wider mb-2">System Prediction:</p>
                <p className="white-text-force text-3xl font-black leading-tight">
                  {selectedIssue.ai_prediction || "Analyzing..."}
                </p>
              </div>
            </div>

            <div className="modal-info-side">
              <div className="flex justify-end">
                <button onClick={() => setSelectedIssue(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="info-card">
                  <span className="info-label flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-red-500" /> Location</span>
                  <p className="info-value">{selectedIssue.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="info-card">
                    <span className="info-label flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue-500" /> Status</span>
                    <p className="info-value text-blue-600 uppercase text-xs font-bold">{selectedIssue.status}</p>
                  </div>
                  <div className="info-card">
                    <span className="info-label flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-orange-500" /> Severity</span>
                    <p className="info-value text-orange-600 uppercase text-xs font-bold">{selectedIssue.severity || 'Normal'}</p>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <span className="info-label flex items-center gap-2"><Info className="w-3.5 h-3.5 text-slate-400" /> Action Brief</span>
                  <textarea 
                    className="w-full mt-2 border border-slate-200 rounded-2xl p-4 text-sm min-h-[140px] outline-none bg-slate-50 font-medium text-slate-700"
                    placeholder="Enter dispatch or resolution notes..."
                  />
                </div>

                <button className="btn-update">
                  <RotateCcw className="w-5 h-5" />
                  Update Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}