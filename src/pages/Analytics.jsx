import React, { useState, useEffect } from 'react';
import { BarChart3, Download, Calendar, Loader2 } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

// --- STYLES PRESERVED FROM ORIGINAL ---
const css = `
  .p-6 { padding: 1.5rem; }
  .lg\\:p-8 { padding: 2rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .justify-center { justify-content: center; }
  .gap-3 { gap: 0.75rem; }
  .gap-2 { gap: 0.5rem; }
  .gap-4 { gap: 1rem; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .bg-white { background-color: #ffffff; }
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .border { border: 1px solid #e2e8f0; }
  .border-slate-200 { border-color: #e2e8f0; }
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .text-xs { font-size: 0.75rem; }
  .text-blue-600 { color: #2563eb; }
  .text-slate-900 { color: #0f172a; }
  .text-slate-600 { color: #475569; }
  .text-slate-500 { color: #64748b; }
  .text-green-600 { color: #16a34a; }
  .text-teal-600 { color: #0d9488; }
  .text-slate-700 { color: #334155; }
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-slate-900 { background-color: #0f172a; }
  .bg-slate-100 { background-color: #f1f5f9; }
  .text-white { color: #ffffff; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .font-medium { font-weight: 500; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .w-5 { width: 1.25rem; }
  .h-5 { height: 1.25rem; }
  .w-3\\.5 { width: 0.875rem; }
  .h-3\\.5 { height: 0.875rem; }
  .flex-1 { flex: 1 1 0%; }
  .transition-colors { transition-property: color, background-color, border-color; transition-duration: 200ms; }
  .hover\\:border-blue-300:hover { border-color: #93c5fd; }
  .hover\\:bg-slate-800:hover { background-color: #1e293b; }
  .hover\\:bg-slate-200:hover { background-color: #e2e8f0; }
  
  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (min-width: 1024px) {
    .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  
  button { cursor: pointer; border: none; outline: none; }
`;

const STATUS_COLORS = {
  'Pending': '#94a3b8',    // Slate
  'In Progress': '#3b82f6', // Blue
  'Resolved': '#10b981'    // Green
};

const SEVERITY_COLORS = {
  'High': '#ef4444',
  'Medium': '#f59e0b',
  'Normal': '#10b981'
};

export default function Analytics({ department }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    monthlyTrend: [],
    statusDist: [],
    severityDist: []
  });

  // Pulling department from props or local storage
  const activeDept = department || localStorage.getItem("authDept") || "Electricity";

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Assuming your backend handles the department filter
        const response = await fetch(`http://127.0.0.1:8000/authority/analytics/${encodeURIComponent(activeDept)}`);
        const data = await response.json();
        
        setStats({
          monthlyTrend: data.monthlyTrend ?? [],
          statusDist: data.statusDist ?? [],
          severityDist: data.severityDist ?? []
        });
      } catch (error) {
        console.error("Fetch failed, using mock departmental data:", error);
        setStats({
          monthlyTrend: [
            { month: 'Oct', issues: 45 }, { month: 'Nov', issues: 52 }, 
            { month: 'Dec', issues: 38 }, { month: 'Jan', issues: 48 }
          ],
          statusDist: [
            { name: 'Pending', value: 12 },
            { name: 'In Progress', value: 15 },
            { name: 'Resolved', value: 21 }
          ],
          severityDist: [
            { category: 'High', count: 8 },
            { category: 'Medium', count: 25 },
            { category: 'Normal', count: 15 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [activeDept]);

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading {activeDept} Metrics...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <style>{css}</style>
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h1 className="text-slate-900 font-bold text-2xl uppercase tracking-tight">
            {activeDept} Reports
          </h1>
        </div>
        <p className="text-slate-600">Dynamic operational insights and performance metrics</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Monthly Trend - Line Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-900 font-semibold">Incoming Issue Trend</h3>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Update Live</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={stats?.monthlyTrend ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="issues" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution - Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-slate-900 font-semibold mb-6">Resolution Status</h3>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={stats?.statusDist ?? []}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {(stats?.statusDist ?? []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
             {(stats?.statusDist ?? []).map((item) => (
               <div key={item.name} className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full" style={{background: STATUS_COLORS[item.name]}} />
                 <span className="text-xs font-medium text-slate-600">{item.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Severity Breakdown - Bar Chart (Full Width) */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-slate-900 font-semibold mb-6">Issue Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats?.severityDist ?? []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={80} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                {(stats?.severityDist ?? []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Section */}
      <h3 className="text-slate-900 font-semibold mb-4">Export {activeDept} Division Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Performance Audit', date: 'Jan 2026', icon: Calendar, color: 'text-blue-600' },
          { title: 'SLA Compliance', date: 'Q1 2026', icon: Calendar, color: 'text-teal-600' },
          { title: 'Resource Allocation', date: 'Jan 2026', icon: Calendar, color: 'text-green-600' }
        ].map((report, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
            <report.icon className={`w-5 h-5 ${report.color} mb-3`} />
            <h3 className="text-slate-900 font-medium mb-1">{report.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{report.date}</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-xs font-medium flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-xs font-medium flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" /> CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}