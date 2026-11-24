'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Bell, ArrowRight, X, Info } from 'lucide-react';
import { Announcement } from '@/types';
import { dataService } from '@/services/dataService';

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dataService.getAnnouncements().then(data => {
      // Pick active critical or high alerts
      const activeAlerts = data.filter(a => a.isActive);
      setAnnouncements(activeAlerts);
    });
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (dismissed || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-navy-900 text-cyan-300';
    }
  };

  return (
    <div className={`relative px-4 py-2.5 transition-colors ${getPriorityStyle(current.priority)} shadow-md`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-3 overflow-hidden mr-4">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/20 shrink-0">
            {current.priority === 'critical' ? (
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            ) : (
              <Bell className="w-3.5 h-3.5" />
            )}
            {current.priority} Alert
          </span>

          <span className="truncate">
            <strong className="mr-1.5 font-bold">{current.title}:</strong>
            <span className="opacity-95">{current.summary}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/announcements#${current.id}`}
            className="flex items-center gap-1 underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold"
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-black/20 rounded-md transition-colors"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
