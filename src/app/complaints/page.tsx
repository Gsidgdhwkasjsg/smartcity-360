'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UploadCloud,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Send,
  Copy,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Complaint, ComplaintCategory, ComplaintPriority } from '@/types';
import { dataService } from '@/services/dataService';

function ComplaintsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'track' ? 'track' : 'file';

  const [activeTab, setActiveTab] = useState<'file' | 'track'>(initialTab);
  
  // Submission Form State
  const [formData, setFormData] = useState({
    citizenName: '',
    citizenPhone: '',
    citizenEmail: '',
    category: 'roads_potholes' as ComplaintCategory,
    title: '',
    description: '',
    locationAddress: '',
    wardNumber: 'Ward 12 - Smart Central',
    priority: 'medium' as ComplaintPriority,
    imageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);

  // Tracking Search State
  const [trackingInput, setTrackingInput] = useState(searchParams.get('id') || '');
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dataService.getComplaints().then(setRecentComplaints);
  }, [createdComplaint]);

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.citizenName || !formData.citizenPhone || !formData.title || !formData.description || !formData.locationAddress) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newComplaint = await res.json();
        setCreatedComplaint(newComplaint);
        setSearchedComplaint(newComplaint);
        
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      } else {
        alert('Failed to lodge grievance. Please try again.');
      }
    } catch {
      alert('Network error while lodging grievance.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle track search
  const handleTrackSearch = async (trackingId: string) => {
    if (!trackingId.trim()) return;
    setSearchError(false);
    const found = await dataService.getComplaintByTrackingId(trackingId.trim());
    if (found) {
      setSearchedComplaint(found);
    } else {
      setSearchedComplaint(null);
      setSearchError(true);
    }
  };

  const copyTrackingId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'assigned':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'under_review':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const timelineSteps = [
    { key: 'submitted', label: 'Ticket Lodged' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'assigned', label: 'Assigned to Dept' },
    { key: 'in_progress', label: 'Work In Progress' },
    { key: 'resolved', label: 'Resolved & Closed' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'submitted': return 0;
      case 'under_review': return 1;
      case 'assigned': return 2;
      case 'in_progress': return 3;
      case 'resolved': return 4;
      default: return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            Metropolitan Citizen Grievance Redressal Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Citizen Grievance & Complaint Redressal
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Lodge municipal complaints directly to civic engineering departments with mandatory SLA resolution tracking and officer accountability.
          </p>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('file')}
            className={`px-5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'file'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lodge New Grievance
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'track'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Track Grievance Ticket
          </button>
        </div>
      </div>

      {/* TAB 1: LODGE GRIEVANCE FORM */}
      {activeTab === 'file' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            
            {createdComplaint ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-display">
                  Grievance Successfully Registered!
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Your civic issue has been logged into the Municipal SCADA system and routed to the corresponding zonal engineering team.
                </p>

                <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Your Tracking ID</span>
                    <p className="text-xl font-black text-cyan-700 tracking-wider font-mono">
                      {createdComplaint.trackingId}
                    </p>
                  </div>
                  <button
                    onClick={() => copyTrackingId(createdComplaint.trackingId)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy ID'}
                  </button>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setCreatedComplaint(null);
                      setFormData({
                        citizenName: '',
                        citizenPhone: '',
                        citizenEmail: '',
                        category: 'roads_potholes',
                        title: '',
                        description: '',
                        locationAddress: '',
                        wardNumber: 'Ward 12 - Smart Central',
                        priority: 'medium',
                        imageUrl: ''
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                  >
                    Lodge Another Grievance
                  </button>

                  <button
                    onClick={() => setActiveTab('track')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500"
                  >
                    View Status Live →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Citizen Incident Details
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Provide accurate location information to expedite maintenance crew dispatch.
                  </p>
                </div>

                {/* Citizen Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.citizenName}
                      onChange={e => setFormData({ ...formData, citizenName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 12345"
                      value={formData.citizenPhone}
                      onChange={e => setFormData({ ...formData, citizenPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="citizen@example.com"
                      value={formData.citizenEmail}
                      onChange={e => setFormData({ ...formData, citizenEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Grievance Category & Ward */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="roads_potholes">Roads & Potholes</option>
                      <option value="streetlights">Malfunctioning Streetlights</option>
                      <option value="water_leakage">Water Pipeline Leakage</option>
                      <option value="garbage_sanitation">Garbage & Sanitation</option>
                      <option value="sewerage">Open Manholes / Sewerage</option>
                      <option value="noise_pollution">Noise / Commercial Nuisance</option>
                      <option value="traffic_parking">Illegal Parking / Traffic Hazards</option>
                      <option value="public_property">Public Property Damage</option>
                      <option value="other">Other Civic Complaint</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Municipal Ward *
                    </label>
                    <select
                      value={formData.wardNumber}
                      onChange={e => setFormData({ ...formData, wardNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option>Ward 01 - Amaravati Core Capital</option>
                      <option>Ward 04 - Rayapudi & North Zone</option>
                      <option>Ward 08 - Civic Center & Justice City</option>
                      <option>Ward 12 - Smart Central</option>
                      <option>Ward 16 - Mangalagiri South Hub</option>
                      <option>Ward 21 - Krishna Riverfront East</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Urgency / Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="low">Low (General suggestion)</option>
                      <option value="medium">Medium (Standard civic issue)</option>
                      <option value="high">High (Impacting traffic / water)</option>
                      <option value="urgent">Urgent (Safety hazard / deep hole)</option>
                    </select>
                  </div>
                </div>

                {/* Complaint Title */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Short Complaint Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deep pothole cluster in front of Knowledge City Roundabout"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Detailed Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the issue, landmarks, hazard level, and exact surroundings..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Exact Location Address */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Exact Location & Street Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Pole #45, Opposite State Bank ATM, Sector 3 Boulevard"
                    value={formData.locationAddress}
                    onChange={e => setFormData({ ...formData, locationAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Image URL / Photo Evidence */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Photo Attachment (Image URL or Snapshot)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or paste image URL"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Attaching clear photos helps field inspection teams bring the exact equipment required.
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Registering Grievance in SCADA...' : 'Submit Grievance to Municipal Board'}
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Sidebar / Instructions & Test Presets (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Citizen SLA Guarantee Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Citizen Charter SLA Commitment
              </div>

              <h4 className="text-base font-bold font-display">
                Guaranteed Resolution Timelines:
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                  <span>Streetlight Outage</span>
                  <strong className="text-emerald-400">Within 24 Hours</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                  <span>Water Pipe Burst</span>
                  <strong className="text-cyan-400">Within 12 Hours</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                  <span>Road Pothole Patching</span>
                  <strong className="text-amber-400">Within 48 Hours</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                  <span>Garbage Clearance</span>
                  <strong className="text-purple-400">Within 8 Hours</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                Automated escalation to Municipal Commissioner if tickets exceed 72 hours.
              </p>
            </div>

            {/* Quick Demo Pre-filled IDs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Try Tracking Pre-Seeded Tickets:
              </h4>
              <p className="text-xs text-slate-500">
                Click any existing live tracking ID to inspect real-time progress:
              </p>

              <div className="space-y-2 text-xs">
                {recentComplaints.slice(0, 3).map(cmp => (
                  <button
                    key={cmp.id}
                    onClick={() => {
                      setActiveTab('track');
                      setTrackingInput(cmp.trackingId);
                      handleTrackSearch(cmp.trackingId);
                    }}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all group"
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-cyan-700">
                      <span>{cmp.trackingId}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {cmp.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-1">{cmp.title}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: TRACK GRIEVANCE STATUS */}
      {activeTab === 'track' && (
        <div className="space-y-8">
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 text-center font-display">
              Track Citizen Grievance Ticket
            </h3>
            <p className="text-xs text-slate-500 text-center">
              Enter your unique Tracking ID (e.g. SC360-2024-8921) to inspect officer assignment, field notes, and real-time status.
            </p>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Tracking ID..."
                  value={trackingInput}
                  onChange={e => setTrackingInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>
              <button
                onClick={() => handleTrackSearch(trackingInput)}
                className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Track Ticket
              </button>
            </div>

            {searchError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs text-center border border-red-200">
                Ticket &quot;{trackingInput}&quot; not found in the metropolitan grievance registry. Please check the ID or select one from below.
              </div>
            )}
          </div>

          {/* Found Complaint Card & Visual Timeline */}
          {searchedComplaint && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Grievance Reference
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h2 className="text-2xl font-black text-cyan-800 font-mono">
                      {searchedComplaint.trackingId}
                    </h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(searchedComplaint.status)}`}>
                      {searchedComplaint.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <p>Lodge Date: <strong>{new Date(searchedComplaint.createdAt).toLocaleDateString()}</strong></p>
                  <p className="text-[11px] text-slate-400">Ward: {searchedComplaint.wardNumber}</p>
                </div>
              </div>

              {/* Visual 5-Step Progress Timeline */}
              <div className="py-4">
                <p className="text-xs font-bold text-slate-700 mb-4">Redressal Lifecycle:</p>
                <div className="grid grid-cols-5 gap-2 relative">
                  {timelineSteps.map((step, idx) => {
                    const currentIdx = getStepIndex(searchedComplaint.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step.key} className="flex flex-col items-center text-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[10px] leading-tight ${
                          isCurrent ? 'font-bold text-emerald-800' : isCompleted ? 'font-semibold text-slate-800' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grievance Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{searchedComplaint.title}</h4>
                  <p className="text-slate-600 mt-1">{searchedComplaint.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Location Landmark:</span>
                    <strong className="text-slate-800">{searchedComplaint.locationAddress}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Lodged By:</span>
                    <strong className="text-slate-800">{searchedComplaint.citizenName} ({searchedComplaint.citizenPhone})</strong>
                  </div>
                </div>

                {/* Assigned Officer & Department */}
                {searchedComplaint.assignedDepartment && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                    <p className="text-[10px] font-bold text-cyan-700 uppercase">
                      Actioning Municipal Authority
                    </p>
                    <p className="font-bold text-slate-900">{searchedComplaint.assignedDepartment}</p>
                    {searchedComplaint.assignedOfficer && (
                      <p className="text-slate-600">Officer In Charge: <strong>{searchedComplaint.assignedOfficer}</strong></p>
                    )}
                    {searchedComplaint.resolutionNotes && (
                      <p className="text-emerald-800 bg-emerald-50 p-2 rounded-lg mt-1 font-medium">
                        Field Update: {searchedComplaint.resolutionNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* All Recently Lodged Grievances Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              Metropolitan Public Complaints Feed
            </h3>
            <p className="text-xs text-slate-500">
              Open transparent registry of active civic tickets across all sectors.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Ward</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {recentComplaints.map(cmp => (
                    <tr key={cmp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-cyan-800">
                        {cmp.trackingId}
                      </td>
                      <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500">
                        {cmp.category.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">
                        {cmp.title}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{cmp.wardNumber}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(cmp.status)}`}>
                          {cmp.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setTrackingInput(cmp.trackingId);
                            handleTrackSearch(cmp.trackingId);
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                          className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default function ComplaintsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Loading Citizen Grievance Portal...</p>
        </div>
      }
    >
      <ComplaintsContent />
    </Suspense>
  );
}
