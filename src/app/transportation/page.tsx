'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Bus,
  Train,
  Plane,
  Car,
  Navigation,
  Clock,
  Search,
  Filter,
  Layers,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Phone,
  Calculator,
  ArrowRight,
  ParkingSquare
} from 'lucide-react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { dataService } from '@/services/dataService';
import { TransportationFacility } from '@/types';

export default function TransportationPage() {
  const [facilities, setFacilities] = useState<TransportationFacility[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFacilityId, setActiveFacilityId] = useState<string | null>(null);

  // Fare calculator state
  const [fromStation, setFromStation] = useState('Central ISBT Terminal');
  const [toStation, setToStation] = useState('Secretariat Metro Station');
  const [transitMode, setTransitMode] = useState<'metro' | 'bus' | 'taxi'>('metro');
  const [calculatedFare, setCalculatedFare] = useState<number>(24);
  const [travelTime, setTravelTime] = useState<string>('18 mins');

  useEffect(() => {
    dataService.getTransportationFacilities().then(setFacilities);
  }, []);

  const filtered = useMemo(() => {
    return facilities.filter(f => {
      const matchType = selectedType === 'all' || f.type === selectedType;
      const matchQuery =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.routes.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchQuery;
    });
  }, [facilities, selectedType, searchQuery]);

  const handleCalculateFare = () => {
    if (transitMode === 'metro') {
      setCalculatedFare(24);
      setTravelTime('18 mins (every 6m)');
    } else if (transitMode === 'bus') {
      setCalculatedFare(15);
      setTravelTime('28 mins (every 10m)');
    } else {
      setCalculatedFare(180);
      setTravelTime('14 mins via Expressway');
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'bus_terminal':
        return { label: 'Bus Terminal', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' };
      case 'metro_station':
        return { label: 'Metro Rail', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'railway_junction':
        return { label: 'Railway Junction', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'airport':
        return { label: 'Airport', color: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'parking':
        return { label: 'Smart Parking & EV', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      default:
        return { label: 'Auto & Taxi', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <Bus className="w-4 h-4" />
            Metropolitan Transit Authority (MTA)
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Transportation & Urban Mobility Network
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Integrated multi-modal connectivity across smart buses, rapid transit metro lines, railway junctions, international airport, EV hubs, and automated parking facilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot"></span>
            94.8% Network Punctuality
          </span>
        </div>
      </div>

      {/* Transit Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-600" />
            Multi-Modal Transit Map
          </h2>
          <span className="text-xs text-slate-500">
            Click pins to inspect terminal details and get driving directions
          </span>
        </div>

        <InteractiveMap
          transport={facilities}
          initialCategory="transport"
          selectedLocationId={activeFacilityId || undefined}
          height="480px"
        />
      </div>

      {/* Fare Estimator & Route Planner Simulator */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-4 h-4" />
          Smart Mobility Calculator
        </div>
        <h3 className="text-xl font-extrabold font-display">
          Plan Journey & Fare Estimator
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Estimate travel time and multi-modal transit fares between major metropolitan stations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">Origin Station</label>
            <select
              value={fromStation}
              onChange={e => setFromStation(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Central ISBT Terminal</option>
              <option>Secretariat Metro Station</option>
              <option>Railway Junction Main</option>
              <option>Vijayawada International Airport</option>
              <option>Knowledge City EV Hub</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">Destination Station</label>
            <select
              value={toStation}
              onChange={e => setToStation(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Secretariat Metro Station</option>
              <option>Central ISBT Terminal</option>
              <option>Railway Junction Main</option>
              <option>Vijayawada International Airport</option>
              <option>Knowledge City EV Hub</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">Transit Mode</label>
            <select
              value={transitMode}
              onChange={e => setTransitMode(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="metro">Metro Rail (Line 1 Blue)</option>
              <option value="bus">Electric Smart Bus (Express)</option>
              <option value="taxi">Prepaid Taxi / Auto</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleCalculateFare}
              className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              Calculate Fare & Time <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Results Banner */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400 text-[11px]">Estimated Single Journey Fare:</span>
              <p className="text-xl font-black text-cyan-300">₹{calculatedFare}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px]">Travel Time:</span>
              <p className="text-xl font-black text-white">{travelTime}</p>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            *Standard municipal smart card and UPI tariff applies. 10% discount on Smart Pass.
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
            placeholder="Search terminals, bus lines, metro routes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'All Modes' },
            { id: 'metro_station', label: 'Metro Rail' },
            { id: 'bus_terminal', label: 'Bus Terminals' },
            { id: 'railway_junction', label: 'Train Junctions' },
            { id: 'airport', label: 'Airports' },
            { id: 'parking', label: 'Smart Parking & EV' },
            { id: 'auto_taxi_stand', label: 'Auto & Taxi' },
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

      {/* Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(fac => {
          const badge = getTypeBadge(fac.type);
          return (
            <div
              key={fac.id}
              id={fac.id}
              className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between shadow-xs hover:shadow-lg ${
                activeFacilityId === fac.id ? 'border-cyan-500 ring-2 ring-cyan-200' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badge.color}`}>
                    {badge.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ● {fac.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {fac.address}
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fac.operatingHours}</span>
                  </div>
                  <div className="text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {fac.fareInfo}
                  </div>
                </div>

                {/* Routes Served */}
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Routes & Corridors
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.routes.map((r, idx) => (
                      <span key={idx} className="text-[10px] bg-cyan-50 text-cyan-800 font-semibold px-2 py-0.5 rounded-md border border-cyan-100">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="mt-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Amenities
                  </p>
                  <p className="text-xs text-slate-500">
                    {fac.facilities.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {fac.contactNumber ? (
                  <a
                    href={`tel:${fac.contactNumber}`}
                    className="flex items-center gap-1 font-semibold text-slate-700 hover:text-cyan-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {fac.contactNumber}
                  </a>
                ) : <span className="text-slate-400 text-[11px]">{fac.capacity}</span>}

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${fac.lat},${fac.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Directions
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
