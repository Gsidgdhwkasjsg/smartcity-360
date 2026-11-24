'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  AlertTriangle,
  Clock,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Share2,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  Building2,
  Radio
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { Announcement } from '@/types';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    dataService.getAnnouncements().then(setAnnouncements);
  }, []);

  const filtered = useMemo(() => {
    return announcements.filter(a => {
      const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
      const matchPriority = selectedPriority === 'all' || a.priority === selectedPriority;
      const matchQuery =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchPriority && matchQuery;
    });
  }, [announcements, selectedCategory, selectedPriority, searchQuery]);

  const handleShare = (id: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/announcements#${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            Metropolitan Civic Information Bureau
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Official Announcements & Public Bulletins
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Verified municipal notices regarding scheduled pipeline work, traffic lane diversions, civic grant announcements, and public advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-600" />
            Official Broadcast Channel
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notices, water shutdown, metro, permits..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'All Priorities' },
            { id: 'critical', label: 'Critical' },
            { id: 'high', label: 'High' },
            { id: 'normal', label: 'Normal' },
            { id: 'info', label: 'Info' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedPriority(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedPriority === tab.id
                  ? 'bg-white text-navy-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-6">
        {filtered.map(anc => (
          <div
            key={anc.id}
            id={anc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${getPriorityStyle(anc.priority)}`}>
                  {anc.priority} Priority
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  {anc.category.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Effective: {new Date(anc.effectiveFrom).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleShare(anc.id)}
                  className="flex items-center gap-1 text-slate-600 hover:text-cyan-700 font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" /> {copiedId === anc.id ? 'Copied' : 'Share'}
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-xl font-display">
                {anc.title}
              </h3>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                {anc.summary}
              </p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed whitespace-pre-line">
                {anc.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Published by: <strong className="text-slate-700">{anc.publishedBy}</strong></span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated Public Release
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
