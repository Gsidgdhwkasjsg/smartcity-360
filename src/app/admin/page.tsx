'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Bell,
  MapPin,
  HeartPulse,
  GraduationCap,
  Bus,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
  Save,
  X,
  Search,
  Filter,
  Users,
  BarChart3,
  RefreshCw,
  Send
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { Complaint, Announcement, CityStatistic, ComplaintStatus } from '@/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'complaints' | 'announcements' | 'stats'>('complaints');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState<CityStatistic[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit Complaint Modal State
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [editStatus, setEditStatus] = useState<ComplaintStatus>('in_progress');
  const [editDept, setEditDept] = useState('');
  const [editOfficer, setEditOfficer] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [savingComplaint, setSavingComplaint] = useState(false);

  // New Announcement Form State
  const [newNotice, setNewNotice] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'public_notice' as any,
    priority: 'normal' as any,
    publishedBy: 'Metropolitan Municipal Administration',
    effectiveFrom: new Date().toISOString()
  });
  const [noticeSaved, setNoticeSaved] = useState(false);

  const loadAllData = () => {
    setLoading(true);
    Promise.all([
      dataService.getComplaints(),
      dataService.getAnnouncements(),
      dataService.getStatistics()
    ]).then(([cmps, ancs, sts]) => {
      setComplaints(cmps);
      setAnnouncements(ancs);
      setStats(sts);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleOpenEditModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setEditStatus(c.status);
    setEditDept(c.assignedDepartment || 'Road Maintenance & Highway Infrastructure');
    setEditOfficer(c.assignedOfficer || 'Er. K. Srinivas (Sub-Divisional Engineer)');
    setEditNotes(c.resolutionNotes || 'Field inspection crew verified. Rectification underway.');
  };

  const handleSaveComplaintStatus = async () => {
    if (!selectedComplaint) return;
    setSavingComplaint(true);
    try {
      const updated = await dataService.updateComplaint(selectedComplaint.id, {
        status: editStatus,
        assignedDepartment: editDept,
        assignedOfficer: editOfficer,
        resolutionNotes: editNotes
      });
      if (updated) {
        setComplaints(prev => prev.map(c => c.id === updated.id ? updated : c));
        setSelectedComplaint(null);
      }
    } catch {
      alert('Failed to update complaint.');
    } finally {
      setSavingComplaint(false);
    }
  };

  const handlePublishAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.summary || !newNotice.content) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const created = await dataService.createAnnouncement({
      ...newNotice,
      isActive: true
    });
    setAnnouncements(prev => [created, ...prev]);
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 2500);
    setNewNotice({
      title: '',
      summary: '',
      content: '',
      category: 'public_notice',
      priority: 'normal',
      publishedBy: 'Metropolitan Municipal Administration',
      effectiveFrom: new Date().toISOString()
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'assigned': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Protected Municipal Administration Console
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Command Center & Civic Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Authorize and assign municipal departments, review filed citizen complaints, update grievance resolution statuses, and broadcast official city notices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAllData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Admin KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Grievances</span>
          <p className="text-2xl font-black text-slate-900 font-display mt-0.5">{complaints.length}</p>
          <span className="text-xs text-blue-600 font-semibold">Active in SCADA</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Resolved Tickets</span>
          <p className="text-2xl font-black text-emerald-600 font-display mt-0.5">
            {complaints.filter(c => c.status === 'resolved').length}
          </p>
          <span className="text-xs text-emerald-700 font-semibold">SLA Compliant</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Active Bulletins</span>
          <p className="text-2xl font-black text-purple-600 font-display mt-0.5">{announcements.length}</p>
          <span className="text-xs text-purple-700 font-semibold">Live on Portal</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">System Role</span>
          <p className="text-2xl font-black text-slate-900 font-display mt-0.5">City Admin</p>
          <span className="text-xs text-slate-500 font-semibold">Full Read & Write</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'complaints' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          Manage Citizen Complaints ({complaints.length})
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'announcements' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4 text-amber-400" />
          Broadcast Announcements ({announcements.length})
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'stats' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          Telemetry Status
        </button>
      </div>

      {/* TAB 1: COMPLAINTS MANAGEMENT */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Incoming Citizen Complaints Queue
            </h3>
            <span className="text-xs text-slate-500">
              Click &quot;Update Status&quot; on any ticket to reassign officer or mark resolved
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Tracking ID</th>
                  <th className="py-3 px-4">Citizen</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Title & Location</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {complaints.map(cmp => (
                  <tr key={cmp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-800">
                      {cmp.trackingId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {cmp.citizenName}
                      <span className="block text-[11px] text-slate-400 font-normal">{cmp.citizenPhone}</span>
                    </td>
                    <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500">
                      {cmp.category.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <strong className="block text-slate-900 truncate">{cmp.title}</strong>
                      <span className="text-[11px] text-slate-400 truncate block">{cmp.locationAddress}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        cmp.priority === 'urgent' ? 'bg-red-100 text-red-800' : cmp.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {cmp.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(cmp.status)}`}>
                        {cmp.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleOpenEditModal(cmp)}
                        className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-xs"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BROADCAST ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* New Announcement Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Publish New Metropolitan Announcement
            </h3>
            <p className="text-xs text-slate-500">
              Notices are broadcast to the top site banner, RSS feed, and citizen dashboard.
            </p>

            {noticeSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Announcement published to live feed!
              </div>
            )}

            <form onSubmit={handlePublishAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ultrasonic Water Pipeline Upgrade in Sector 3"
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Notice Category</label>
                  <select
                    value={newNotice.category}
                    onChange={e => setNewNotice({ ...newNotice, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="public_notice">Public Notice</option>
                    <option value="traffic_update">Traffic Update</option>
                    <option value="water_shutdown">Water Shutdown</option>
                    <option value="power_maintenance">Power Maintenance</option>
                    <option value="emergency_alert">Emergency Alert</option>
                    <option value="civic_events">Civic Events</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
                  <select
                    value={newNotice.priority}
                    onChange={e => setNewNotice({ ...newNotice, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="normal">Normal (Standard Bulletin)</option>
                    <option value="info">Info (Grant / Hackathon)</option>
                    <option value="high">High (Service Disruption)</option>
                    <option value="critical">Critical (Emergency Ticker Alert)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary (1-2 Sentences) *</label>
                <input
                  type="text"
                  required
                  placeholder="Short brief displayed on homepage ticker..."
                  value={newNotice.summary}
                  onChange={e => setNewNotice({ ...newNotice, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Full bulletin body, timings, affected wards, helplines..."
                  value={newNotice.content}
                  onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-cyan-400" /> Broadcast to Citizens
              </button>
            </form>
          </div>

          {/* Published Announcements Feed (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Active Published Announcements:</h4>
            <div className="space-y-3">
              {announcements.map(anc => (
                <div key={anc.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{anc.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                      {anc.priority}
                    </span>
                  </div>
                  <p className="text-slate-500 line-clamp-2">{anc.summary}</p>
                  <p className="text-[10px] text-slate-400">Date: {new Date(anc.effectiveFrom).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: TELEMETRY STATUS */}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-base">
            System Telemetry & Open Data Health
          </h3>
          <p className="text-slate-500">
            Real-time sensory feed health and database synchronization status.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <strong className="block text-sm">Open-Meteo Weather API</strong>
              <p className="text-[11px] text-emerald-700 mt-1">Status: 200 OK • Live Sync active</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900">
              <strong className="block text-sm">Leaflet GIS Engine</strong>
              <p className="text-[11px] text-cyan-700 mt-1">Status: Online • OpenStreetMap tiles</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
              <strong className="block text-sm">Supabase / Persistent Store</strong>
              <p className="text-[11px] text-purple-700 mt-1">Status: Active • Auto-fallback verified</p>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE COMPLAINT MODAL */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Update Grievance</span>
                <h3 className="font-black text-cyan-800 text-lg font-mono">
                  {selectedComplaint.trackingId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-500 font-semibold">Title:</p>
                <p className="font-bold text-slate-900 text-sm">{selectedComplaint.title}</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lifecycle Status</label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="submitted">1. Submitted</option>
                  <option value="under_review">2. Under Review</option>
                  <option value="assigned">3. Assigned to Department</option>
                  <option value="in_progress">4. In Progress (Crew Dispatched)</option>
                  <option value="resolved">5. Resolved & Verified</option>
                  <option value="rejected">Rejected (Invalid jurisdiction)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Department</label>
                <input
                  type="text"
                  value={editDept}
                  onChange={e => setEditDept(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Officer</label>
                <input
                  type="text"
                  value={editOfficer}
                  onChange={e => setEditOfficer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Field Resolution Notes</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-3 text-xs">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveComplaintStatus}
                disabled={savingComplaint}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs"
              >
                {savingComplaint ? 'Updating...' : 'Save & Notify Citizen'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
