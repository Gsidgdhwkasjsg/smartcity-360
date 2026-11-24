'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Droplets,
  Zap,
  Trash2,
  FileText,
  Clock,
  Phone,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { PublicService } from '@/types';

export default function PublicServicesPage() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('all');

  useEffect(() => {
    dataService.getPublicServices().then(setServices);
  }, []);

  const filtered = services.filter(s => {
    return selectedDept === 'all' || s.department === selectedDept;
  });

  const getDeptIcon = (dept: string) => {
    switch (dept) {
      case 'water_supply':
        return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'electricity':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'waste_management':
        return <Trash2 className="w-5 h-5 text-emerald-600" />;
      case 'property_tax':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'civil_certificates':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <Building2 className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            Metropolitan Civic Digital Delivery
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Public Services & E-Governance Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Access certified municipal services, smart 24/7 water connections, solar net-metering applications, property tax clearance, birth registries, and civic grievance resolution.
          </p>
        </div>

        <Link
          href="/complaints"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          File Civic Grievance
        </Link>
      </div>

      {/* Online Verification Indicator Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">Official System Integration Disclosure</span>
            <p className="text-slate-400">
              Services marked with <span className="text-cyan-400 font-bold">● Connected Online Portal</span> redirect to authorized departmental state servers with DigiLocker and Aadhaar e-KYC.
            </p>
          </div>
        </div>

        <Link
          href="/complaints?tab=track"
          className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 font-bold shrink-0"
        >
          Track Grievance Ticket →
        </Link>
      </div>

      {/* Department Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
        {[
          { id: 'all', label: 'All Public Services' },
          { id: 'water_supply', label: 'Water Supply & Flow' },
          { id: 'electricity', label: 'Electricity & Solar' },
          { id: 'waste_management', label: 'Waste Management' },
          { id: 'property_tax', label: 'Property Tax' },
          { id: 'civil_certificates', label: 'Birth & Death Registry' },
          { id: 'road_maintenance', label: 'Roads & Streetlights' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedDept(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedDept === tab.id
                ? 'bg-white text-navy-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(serv => (
          <div
            key={serv.id}
            id={serv.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-100">
                    {getDeptIcon(serv.department)}
                  </div>
                  <span className="text-[11px] font-bold uppercase text-slate-500">
                    {serv.department.replace('_', ' ')}
                  </span>
                </div>

                {serv.isOnlineEnabled ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> E-Service Online
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Informational Guide
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-lg leading-snug">
                {serv.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {serv.description}
              </p>

              {/* SLAs, Fees, Hours */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Turnaround SLA</span>
                  <strong className="text-slate-900 font-bold">{serv.estimatedDays} Business Days</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Official Tariff</span>
                  <strong className="text-slate-900 font-bold truncate block">{serv.feeDetails}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Service Hours</span>
                  <strong className="text-slate-900 font-bold truncate block">09:00 - 17:30</strong>
                </div>
              </div>

              {/* Requirements Checklist */}
              {serv.requirements && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Required Documentation
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {serv.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Action Links */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={`tel:${serv.helplineNumber}`}
                className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-cyan-700"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {serv.helplineNumber}
              </a>

              {serv.onlinePortalUrl ? (
                <a
                  href={serv.onlinePortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold transition-colors shadow-xs"
                >
                  Access E-Portal <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              ) : (
                <Link
                  href="/complaints"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Lodge Complaint
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
