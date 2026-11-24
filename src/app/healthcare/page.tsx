'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  HeartPulse,
  Phone,
  Clock,
  Navigation,
  ShieldCheck,
  Search,
  ExternalLink,
  Bed,
  CheckCircle2,
  AlertTriangle,
  Ambulance,
  Building2,
  Stethoscope,
  Filter
} from 'lucide-react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { dataService } from '@/services/dataService';
import { Hospital } from '@/types';

export default function HealthcarePage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHospitalId, setActiveHospitalId] = useState<string | null>(null);

  useEffect(() => {
    dataService.getHospitals().then(setHospitals);
  }, []);

  const allServices = useMemo(() => {
    const set = new Set<string>();
    hospitals.forEach(h => h.services.forEach(s => set.add(s)));
    return Array.from(set);
  }, [hospitals]);

  const filtered = useMemo(() => {
    return hospitals.filter(h => {
      const matchType = selectedType === 'all' || h.type === selectedType;
      const matchService = selectedService === 'all' || h.services.includes(selectedService);
      const matchQuery =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchService && matchQuery;
    });
  }, [hospitals, selectedType, selectedService, searchQuery]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'government':
        return { label: 'Government Hospital', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'private':
        return { label: 'Private Multi-Specialty', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'clinic':
        return { label: 'Urban Wellness Clinic', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'diagnostic':
        return { label: 'Diagnostic & Imaging Lab', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' };
      default:
        return { label: '24/7 Pharmacy', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="w-4 h-4" />
            Metropolitan Directorate of Health Services
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Healthcare, Hospitals & Emergency Care
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Verified network of apex government trauma institutions, super-specialty hospitals, urban clinics, diagnostic centers, and 24/7 pharmacies across the metropolitan district.
          </p>
        </div>

        {/* Emergency Ambulance Fast Callout */}
        <div className="flex items-center gap-2">
          <a
            href="tel:108"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/25 transition-all"
          >
            <Ambulance className="w-4 h-4 animate-bounce" />
            Emergency Ambulance: 108
          </a>
        </div>
      </div>

      {/* Emergency Hotline Banner */}
      <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600 text-white">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-red-950 text-sm">Need Urgent Critical Care or ICU Bed?</span>
            <p className="text-red-800">
              AIIMS Apex Trauma and GGH Emergency departments operate 24/7/365 with dedicated ventilator resuscitation bays.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a href="tel:112" className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800">
            Dial 112 (National SOS)
          </a>
          <a href="tel:108" className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">
            Call 108 (Ambulance)
          </a>
        </div>
      </div>

      {/* Hospital Locations Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Navigation className="w-5 h-5 text-red-600" />
            Healthcare Facilities on GIS Map
          </h2>
          <span className="text-xs text-slate-500">
            Red markers indicate verified hospital & emergency units
          </span>
        </div>

        <InteractiveMap
          hospitals={hospitals}
          initialCategory="hospital"
          selectedLocationId={activeHospitalId || undefined}
          height="460px"
        />
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hospital name, cardiology, trauma, ICU..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            {[
              { id: 'all', label: 'All Healthcare' },
              { id: 'government', label: 'Government Hospitals' },
              { id: 'private', label: 'Private Hospitals' },
              { id: 'clinic', label: 'Clinics' },
              { id: 'diagnostic', label: 'Diagnostics' },
              { id: 'pharmacy', label: '24/7 Pharmacies' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedType === tab.id
                    ? 'bg-white text-navy-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Specialty Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Filter by Specialty:</span>
          <button
            onClick={() => setSelectedService('all')}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              selectedService === 'all' ? 'bg-navy-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Specialties
          </button>
          {allServices.slice(0, 8).map(srv => (
            <button
              key={srv}
              onClick={() => setSelectedService(srv)}
              className={`px-2.5 py-1 rounded-lg shrink-0 ${
                selectedService === srv ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {srv}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(hosp => {
          const badge = getTypeBadge(hosp.type);
          return (
            <div
              key={hosp.id}
              id={hosp.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl ${
                activeHospitalId === hosp.id ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Photo & verified pill */}
                {hosp.imageUrl && (
                  <div className="relative h-44 w-full bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hosp.imageUrl} alt={hosp.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border backdrop-blur-md shadow ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    {hosp.verified && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3 h-3" /> Verified Official
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {hosp.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {hosp.address}
                  </p>

                  {/* Bed Capacity and Ambulance Indicators */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Total Beds</span>
                      <strong className="text-slate-900 font-bold">{hosp.bedCapacity}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-red-50/70 border border-red-100">
                      <span className="text-red-700 text-[10px] block">ICU Beds</span>
                      <strong className="text-red-900 font-bold">{hosp.icuBeds}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-emerald-700 text-[10px] block">Ambulance</span>
                      <strong className="text-emerald-900 font-bold">{hosp.hasAmbulance ? 'Yes' : 'No'}</strong>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{hosp.operatingHours}</span>
                  </div>

                  {/* Services Tags */}
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Key Services & Departments
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {hosp.services.map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${hosp.phone}`}
                    className="flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700"
                  >
                    <Phone className="w-4 h-4" /> Call Facility
                  </a>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hosp.lat},${hosp.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Directions
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
