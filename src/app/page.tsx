'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Briefcase,
  Bus,
  HeartPulse,
  GraduationCap,
  AlertOctagon,
  MapPin,
  TrendingUp,
  Activity,
  Zap,
  ShieldCheck,
  Search,
  ArrowRight,
  Clock,
  Sparkles,
  Building,
  CheckCircle2,
  PhoneCall,
  FileText,
  Navigation,
  Globe2,
  Layers,
  ChevronRight
} from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { dataService } from '@/services/dataService';
import {
  CityStatistic,
  Hospital,
  EducationalInstitution,
  TransportationFacility,
  CityLocation,
  EmergencyContact,
  Announcement
} from '@/types';

export default function HomePage() {
  const [stats, setStats] = useState<CityStatistic[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [education, setEducation] = useState<EducationalInstitution[]>([]);
  const [transport, setTransport] = useState<TransportationFacility[]>([]);
  const [locations, setLocations] = useState<CityLocation[]>([]);
  const [emergency, setEmergency] = useState<EmergencyContact[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Promise.all([
      dataService.getStatistics(),
      dataService.getHospitals(),
      dataService.getEducationalInstitutions(),
      dataService.getTransportationFacilities(),
      dataService.getCityLocations(),
      dataService.getEmergencyContacts(),
      dataService.getAnnouncements()
    ]).then(([s, h, e, t, l, em, a]) => {
      setStats(s);
      setHospitals(h);
      setEducation(e);
      setTransport(t);
      setLocations(l);
      setEmergency(em);
      setAnnouncements(a);
    });
  }, []);

  return (
    <div className="w-full space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-slate-950 overflow-hidden text-white">
        {/* Background City Graphic / Grid Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=2000&q=80')`
            }}
          />
          {/* Futuristic gradients & glass accents */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 live-dot"></span>
                SMARTCITY 360 • Metropolitan Citizen Gateway
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Your City, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Connected.</span>
                <br />
                Your Future, <span className="text-cyan-400 underline decoration-cyan-500/50 underline-offset-8">Smarter.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Explore city services, discover important locations, access public information, and stay connected with everything happening around you in real time.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/explore"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  Explore City
                </Link>

                <Link
                  href="/services"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/60 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  Public Services
                </Link>

                <Link
                  href="/map"
                  className="px-5 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 font-medium text-sm border border-slate-700/80 transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  View Interactive Map
                </Link>
              </div>

              {/* Fast Emergency One-Tap Prompt */}
              <div className="pt-4 flex items-center gap-3 text-xs text-slate-400 border-t border-slate-800/80 max-w-lg">
                <span className="flex items-center gap-1.5 text-red-400 font-bold">
                  <AlertOctagon className="w-4 h-4" /> Immediate Assistance:
                </span>
                <span>Dial <strong>112</strong> for Police, Ambulance & Fire Services</span>
                <Link href="/emergency" className="text-cyan-400 hover:underline font-semibold ml-auto">
                  Emergency Directory →
                </Link>
              </div>

            </div>

            {/* Right Column: Live Telemetry & Weather Widget */}
            <div className="lg:col-span-5 space-y-4">
              <WeatherWidget />

              {/* Live City Highlights Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl shadow-xl text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <span className="flex items-center gap-2 text-cyan-400">
                    <Activity className="w-3.5 h-3.5" />
                    Urban Command Telemetry
                  </span>
                  <span className="text-emerald-400 font-semibold">● Normal Operations</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <p className="text-slate-400 text-[11px]">Traffic Congestion</p>
                    <p className="text-base font-bold text-emerald-400 mt-0.5">22% • Fluid Flow</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Avg Speed: 34 km/h</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <p className="text-slate-400 text-[11px]">Clean Solar Grid</p>
                    <p className="text-base font-bold text-cyan-400 mt-0.5">24.8 MW</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">38% City Footprint</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <p className="text-slate-400 text-[11px]">Available ICU Beds</p>
                    <p className="text-base font-bold text-sky-400 mt-0.5">332 Beds</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Across 48 Hospitals</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <p className="text-slate-400 text-[11px]">Grievance SLA</p>
                    <p className="text-base font-bold text-amber-400 mt-0.5">96.6%</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Avg 34h Turnaround</p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>SCADA Sensor Hub • Amaravati Metro</span>
                  <Link href="/dashboard" className="text-cyan-400 font-semibold hover:underline">
                    Detailed Analytics →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FAST CITIZEN ACTION TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <Link
            href="/emergency"
            className="p-4 rounded-2xl bg-white border border-red-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 text-sm block group-hover:text-red-600 transition-colors">
                Emergency 112
              </span>
              <span className="text-[11px] text-slate-500">Police, Fire & Medical</span>
            </div>
          </Link>

          <Link
            href="/complaints"
            className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 text-sm block group-hover:text-amber-600 transition-colors">
                File Grievance
              </span>
              <span className="text-[11px] text-slate-500">Potholes, Lights, Waste</span>
            </div>
          </Link>

          <Link
            href="/healthcare"
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 text-sm block group-hover:text-red-600 transition-colors">
                Find Hospital
              </span>
              <span className="text-[11px] text-slate-500">ICU, Trauma & Clinics</span>
            </div>
          </Link>

          <Link
            href="/transportation"
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bus className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 text-sm block group-hover:text-cyan-600 transition-colors">
                Metro & Transit
              </span>
              <span className="text-[11px] text-slate-500">Schedules, Lines, Bus</span>
            </div>
          </Link>

          <Link
            href="/services#serv-004"
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 text-sm block group-hover:text-blue-600 transition-colors">
                Pay Taxes
              </span>
              <span className="text-[11px] text-slate-500">Property & Municipal</span>
            </div>
          </Link>

          <Link
            href="/map"
            className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 text-sm block group-hover:text-emerald-600 transition-colors">
                City GIS Map
              </span>
              <span className="text-[11px] text-slate-500">Categorized Locations</span>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. CITY DASHBOARD & TELEMETRY STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              Verified City Metrics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Metropolitan Pulse & Smart Statistics
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Real-time telemetry and verified administrative counts across municipal governance, public transit, education, and health infrastructure.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            View Complete City Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Statistic Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.slice(0, 8).map(st => (
            <div
              key={st.key}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500">
                  {st.category}
                </span>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                  st.trend === 'up' ? 'text-emerald-600' : st.trend === 'down' ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  <TrendingUp className="w-3 h-3" /> {st.changeRate > 0 ? `+${st.changeRate}%` : `${st.changeRate}%`}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                {st.displayValue}
              </div>

              <p className="text-xs font-bold text-slate-700 mt-1">{st.title}</p>
              
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[130px]">{st.verifiedSource}</span>
                {st.isLive ? (
                  <span className="text-emerald-600 font-semibold">● Live Telemetry</span>
                ) : (
                  <span className="text-slate-400">Official Census</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CITY MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              GIS Geospatial Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Explore City on Interactive Map
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Locate nearby hospitals, colleges, bus stations, metro lines, police outposts, and cultural attractions with verified GPS coordinates and driving directions.
            </p>
          </div>

          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 px-4 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
          >
            Launch Full Screen GIS Map <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        </div>

        {/* Live Leaflet Interactive Map */}
        <InteractiveMap
          hospitals={hospitals}
          education={education}
          transport={transport}
          locations={locations}
          emergency={emergency}
          height="540px"
        />
      </section>

      {/* 5. IMPORTANT CITY ANNOUNCEMENTS & RECENT NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              Official Public Bulletins
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              City News & Public Announcements
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Stay informed with critical traffic advisories, municipal maintenance schedules, and public civic opportunities.
            </p>
          </div>

          <Link
            href="/announcements"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            View All Announcements <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {announcements.slice(0, 4).map(anc => (
            <div
              key={anc.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase mb-2.5">
                  <span className={`px-2 py-0.5 rounded-md ${
                    anc.priority === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : anc.priority === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-cyan-100 text-cyan-800'
                  }`}>
                    {anc.priority} Priority
                  </span>
                  <span className="text-slate-400 font-medium">
                    {new Date(anc.effectiveFrom).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                  {anc.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 mt-2">
                  {anc.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                  {anc.publishedBy}
                </span>
                <Link
                  href={`/announcements#${anc.id}`}
                  className="font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
                >
                  Read <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOUR CORE PILLARS OF SMART URBAN LIVING */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Digital Transformation Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Built on Modern Smart City Pillars
            </h2>
            <p className="text-sm text-slate-400">
              Transforming urban operations through connected internet-of-things (IoT), data transparency, and citizen-first design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Connected Transit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated ticketing, real-time electric bus tracking, automated metro signaling, and EV supercharger network.
              </p>
              <Link href="/transportation" className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:underline">
                Explore Mobility →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Resilient Healthcare</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time trauma hospital bed capacity, 24/7 emergency dispatch telemetry, and integrated blood bank registers.
              </p>
              <Link href="/healthcare" className="mt-4 inline-flex items-center gap-1 text-xs text-red-400 font-semibold hover:underline">
                Explore Healthcare →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Green Ecology</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hyperlocal atmospheric sensor grids, solar micro-generation tracking, smart water conservation, and automated recycling.
              </p>
              <Link href="/environment" className="mt-4 inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold hover:underline">
                Explore Ecology →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Accountable Governance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Public grievance tracking with verified officer assignments, digital birth certificates, and fast property tax clearance.
              </p>
              <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-xs text-amber-400 font-semibold hover:underline">
                Explore Governance →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CITIZEN GRIEVANCE FAST CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 border border-cyan-500/30 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 uppercase tracking-widest border border-cyan-500/30">
              Citizen First Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              See a Civic Issue? Report It Directly to Municipal Teams.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upload photos of potholes, malfunctioning streetlights, water pipeline leakages, or uncollected garbage. Receive a unique tracking ID and watch real-time resolution updates.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/complaints"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
              >
                Submit Citizen Complaint
              </Link>
              <Link
                href="/complaints?tab=track"
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
              >
                Track Existing Ticket
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
