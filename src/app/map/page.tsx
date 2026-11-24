'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Layers,
  Search,
  Crosshair,
  Compass,
  HeartPulse,
  GraduationCap,
  Bus,
  Shield,
  Navigation,
  ExternalLink,
  Phone,
  Bookmark,
  Share2,
  Check
} from 'lucide-react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { dataService } from '@/services/dataService';
import {
  Hospital,
  EducationalInstitution,
  TransportationFacility,
  CityLocation,
  EmergencyContact
} from '@/types';

export default function CityMapPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [education, setEducation] = useState<EducationalInstitution[]>([]);
  const [transport, setTransport] = useState<TransportationFacility[]>([]);
  const [locations, setLocations] = useState<CityLocation[]>([]);
  const [emergency, setEmergency] = useState<EmergencyContact[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([
      dataService.getHospitals(),
      dataService.getEducationalInstitutions(),
      dataService.getTransportationFacilities(),
      dataService.getCityLocations(),
      dataService.getEmergencyContacts()
    ]).then(([h, e, t, l, em]) => {
      setHospitals(h);
      setEducation(e);
      setTransport(t);
      setLocations(l);
      setEmergency(em);
      setSavedIds(dataService.getSavedLocationIds());
    });
  }, []);

  const toggleSave = (id: string) => {
    dataService.toggleSaveLocation(id);
    setSavedIds(dataService.getSavedLocationIds());
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Map Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            GIS Geospatial Infrastructure Engine
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Interactive City GIS Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            High-precision categorized geospatial markers for hospitals, colleges, rapid transit, emergency hubs, and historic cultural landmarks across Amaravati Metropolitan District.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Link Copied!' : 'Share Map'}
          </button>
        </div>
      </div>

      {/* Primary Full-Feature Leaflet Map Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        <InteractiveMap
          hospitals={hospitals}
          education={education}
          transport={transport}
          locations={locations}
          emergency={emergency}
          height="660px"
          initialCategory="all"
          selectedLocationId={selectedEntityId || undefined}
        />
      </div>

      {/* Quick Location Explorer Drawer List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Quick Jump to Prominent City Landmarks
          </h3>
          <span className="text-xs text-slate-400">
            Click any entry to zoom directly on the map
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {locations.slice(0, 4).map(loc => (
            <div
              key={loc.id}
              onClick={() => {
                setSelectedEntityId(loc.id);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-cyan-500 hover:shadow-md cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-amber-700 mb-1">
                  <span>★ {loc.rating}</span>
                  <span>{loc.category.replace('_', ' ')}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-cyan-700 transition-colors line-clamp-1">
                  {loc.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{loc.address}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-cyan-700 font-semibold">
                <span>View on Map →</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(loc.id);
                  }}
                  className={`p-1 rounded-md ${
                    savedIds.includes(loc.id) ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Bookmark Location"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
