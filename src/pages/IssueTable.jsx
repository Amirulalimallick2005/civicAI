import React, { useState } from 'react';
import { 
  MapPin, FileText, Activity, Clock, CheckCircle2, 
  User, Star, Search, X, XCircle, Eye, Image as ImageIcon 
} from 'lucide-react';

const css = `
  /* 1. Main Container & Table Layout */
  .table-wrapper { 
    background: #ffffff; 
    border-radius: 16px; 
    border: 1px solid #eef2f6; 
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .pro-thead { 
    background: #fcfcfd; 
    border-bottom: 2px solid #f1f5f9; 
  }
  
  .pro-th {
    padding: 1rem 1.5rem;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .pro-tr { 
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid #f1f5f9;
  }
  
  .pro-tr:hover { 
    background-color: #f8fbff; 
    box-shadow: inset 4px 0 0 0 #2563eb;
  }

  /* 2. Visual Pills (Status/Priority) */
  .pill {
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  
  .priority-high { background: #fff1f2; color: #e11d48; border: 1px solid #ffe4e6; }
  .priority-medium { background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5; }
  .priority-normal { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }

  .status-resolved { background: #ecfdf5; color: #059669; }
  .status-progress { background: #eff6ff; color: #2563eb; }
  .status-pending { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
  .status-review { background: #fef9c3; color: #a16207; border: 1px solid #fef08a; }

  /* 3. Action Buttons */
  .btn-manage {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.2s;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .btn-assign { background: #2563eb; color: white; }
  .btn-assign:hover { background: #1d4ed8; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
  
  .btn-resolve { background: #10b981; color: white; }
  .btn-resolve:hover { background: #059669; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); }

  .btn-close { background: #6366f1; color: white; }
  .btn-close:hover { background: #4f46e5; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }

  .btn-reject { background: #ffffff; color: #e11d48; border: 1px solid #fda4af; }
  .btn-reject:hover { background: #fff1f2; }

  .btn-view { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
  .btn-view:hover { background: #f1f5f9; border-color: #cbd5e1; }

  /* 4. Refined Modal & Worker Cards */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .worker-modal {
    background: white;
    width: 90%;
    max-width: 480px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
  }

  .preview-modal {
    background: white;
    width: 95%;
    max-width: 550px;
    border-radius: 24px;
    padding: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .modal-header {
    padding: 24px;
    border-bottom: 1px solid #f1f5f9;
    background: #ffffff;
  }

  .worker-list-scroll {
    padding: 16px 24px 24px;
    max-height: 400px;
    overflow-y: auto;
  }

  .worker-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border: 1px solid #f1f5f9;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .worker-card:hover:not(.disabled) {
    border-color: #2563eb;
    background: #f8fbff;
    transform: translateY(-1px);
  }

  .worker-card.disabled { 
    opacity: 0.5; 
    cursor: not-allowed; 
    background: #f8fafc; 
  }

  .rating-tag {
    background: #fefce8; 
    color: #854d0e; 
    padding: 2px 8px; 
    border-radius: 6px;
    font-size: 10px; 
    font-weight: 800; 
    display: flex; 
    align-items: center; 
    gap: 2px;
  }
`;

const MOCK_WORKERS = [
  { id: 1, name: "Rahul Sharma", rating: 4.8, available: true, dept: "road" },
  { id: 2, name: "Amit Patel", rating: 4.5, available: true, dept: "road" },
  { id: 3, name: "Vikram Singh", rating: 4.9, available: true, dept: "electricity" },
  { id: 4, name: "Rohan Mehra", rating: 4.2, available: false, dept: "electricity" },
  { id: 5, name: "Suresh Kumar", rating: 4.7, available: true, dept: "garbage" },
  { id: 6, name: "Priya Rai", rating: 4.6, available: true, dept: "garbage" },
  { id: 7, name: "Karan Johar", rating: 4.4, available: true, dept: "graffiti" },
  { id: 8, name: "Arjun Kapoor", rating: 4.8, available: true, dept: "tree" },
];

export default function IssueTable({ issues = [], onIssueClick, onRefresh, currentDepartment = "" }) {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleUpdateStatus = async (id, newStatus, additionalData = {}) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authority/reports/update/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, ...additionalData })
      });
      if (response.ok) {
        setIsModalOpen(false);
        setPreviewImage(null);
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const getPriorityClass = (p) => {
    const priority = p?.toLowerCase();
    if (priority === 'high') return 'priority-high';
    if (priority === 'medium') return 'priority-medium';
    return 'priority-normal';
  };

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'resolved') return 'status-resolved';
    if (s === 'pending closure') return 'status-review';
    if (s === 'in progress') return 'status-progress';
    if (s === 'closed') return 'status-pending';
    return 'status-pending';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'resolved') return <CheckCircle2 className="w-3 h-3" />;
    if (s === 'pending closure') return <Activity className="w-3 h-3" />;
    if (s === 'in progress') return <Activity className="w-3 h-3" />;
    if (s === 'closed') return <CheckCircle2 className="w-3 h-3 opacity-50" />;
    return <Clock className="w-3 h-3" />;
  };

  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    const activeDept = (currentDepartment || "").trim().toLowerCase();
    const workerTag = (worker.dept || "").trim().toLowerCase();
    const isDeptMatch = activeDept.includes(workerTag) || workerTag.includes(activeDept);
    const isSearchMatch = worker.name.toLowerCase().includes(searchTerm.toLowerCase());
    return isDeptMatch && isSearchMatch;
  });

  return (
    <div className="table-wrapper">
      <style>{css}</style>

      {/* Proof Preview Modal */}
      {previewImage && (
        <div className="modal-overlay" onClick={() => setPreviewImage(null)} style={{ zIndex: 2000 }}>
          <div className="preview-modal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">Resolution Evidence</h3>
              </div>
              <button onClick={() => setPreviewImage(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={previewImage} 
                alt="Work Evidence" 
                className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                onError={(e) => { e.target.src = "https://via.placeholder.com/500x300?text=No+Image+Found"; }}
              />
            </div>
            <p className="text-center text-xs text-slate-400 mt-4 italic">
              Submitted by citizen for verification
            </p>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="worker-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Assign Dispatch</h3>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">{currentDepartment}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Incident: {selectedIssue?.ref_number || selectedIssue?.id}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={`Search ${currentDepartment} staff...`} 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="worker-list-scroll">
              {filteredWorkers.length > 0 ? filteredWorkers.map(worker => (
                <div 
                  key={worker.id} 
                  className={`worker-card ${!worker.available ? 'disabled' : ''}`}
                  // Updated line: We now pass the assigned_worker name in the additionalData object
onClick={() => worker.available && handleUpdateStatus(selectedIssue.id, 'In Progress', { assigned_worker: worker.name })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm">
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{worker.name}</h4>
                      <div className="rating-tag mt-0.5"><Star className="w-2.5 h-2.5 fill-current" /> {worker.rating}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold tracking-tighter ${worker.available ? 'text-green-500' : 'text-red-400'}`}>
                      {worker.available ? 'AVAILABLE' : 'ON-TASK'}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <User className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">No {currentDepartment} workers found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="pro-thead">
            <tr>
              <th className="pro-th">Incident Reference</th>
              <th className="pro-th">Type & Classification</th>
              <th className="pro-th">Location Details</th>
              <th className="pro-th">Priority</th>
              <th className="pro-th">Current Status</th>
              <th className="pro-th text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {issues.length > 0 ? [...issues].reverse().map((issue) => {
              const currentStatus = issue.status?.toLowerCase() || '';

              return (
                <tr 
                  key={issue.id} 
                  className="pro-tr cursor-pointer" 
                  onClick={() => onIssueClick?.(issue)}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 leading-none mb-1">
                        {issue.ref_number || "N/A"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase">
                        Log-ID: {issue.id?.toString().slice(-6)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-700 block">
                      {issue.ai_prediction || "General Report"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {issue.address || "No address provided"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`pill ${getPriorityClass(issue.severity)}`}>
                      {issue.severity || 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`pill ${getStatusClass(issue.status)}`}>
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {currentStatus === 'pending' ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIssue(issue);
                            setIsModalOpen(true);
                          }}
                          className="btn-manage btn-assign shadow-sm"
                        >
                          Assign Dispatch
                        </button>
                      ) : currentStatus === 'in progress' ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                           // Change is_rejected to is_rejection to match backend
handleUpdateStatus(issue.id, 'Resolved', { is_rejection: true });
                          }}
                          className="btn-manage btn-resolve shadow-sm"
                        >
                          Mark Resolved
                        </button>
                      ) : currentStatus === 'pending closure' ? (
                        <div className="flex flex-col gap-1.5 min-w-[140px]">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewImage(issue.resolved_image);
                            }}
                            className="btn-manage btn-view shadow-sm justify-center"
                          >
                            <Eye size={14}/> View Proof
                          </button>
                          <div className="flex gap-1.5">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(issue.id, 'Closed', { is_rejected: false });
                              }}
                              className="btn-manage btn-close shadow-sm flex-1 justify-center text-[10px] px-1"
                            >
                              <CheckCircle2 size={12}/> Approve
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(issue.id, 'Resolved', { is_rejected: true });
                              }}
                              className="btn-manage btn-reject shadow-sm flex-1 justify-center text-[10px] px-1"
                            >
                              <XCircle size={12}/> Reject
                            </button>
                          </div>
                        </div>
                      ) : currentStatus === 'resolved' ? (
                        <div className="text-[10px] text-amber-600 font-bold italic flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                          <Clock className="w-3 h-3" /> Awaiting Citizen Photo
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold italic">
                          <CheckCircle2 className="w-3 h-3" />
                          Archived
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-slate-900 font-bold">No Matching Reports</h4>
                  <p className="text-slate-500 text-sm">No issues found matching your current filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}