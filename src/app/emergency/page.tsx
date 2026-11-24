'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertOctagon,
  Phone,
  Shield,
  HeartPulse,
  Flame,
  Radio,
  Navigation,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  LifeBuoy,
  ZapOff
} from 'lucide-react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { dataService } from '@/services/dataService';
import { EmergencyContact, Hospital } from '@/types';

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [activeTab, setActiveTab] = useState<'hotlines' | 'guidelines'>('hotlines');

  useEffect(() => {
    Promise.all([
      dataService.getEmergencyContacts(),
      dataService.getHospitals()
    ]).then(([em, hosp]) => {
      setContacts(em);
      setHospitals(hosp);
    });
  }, []);

  const getEmergencyIcon = (category: string) => {
    switch (category) {
      case 'police':
        return <Shield className="w-6 h-6 text-blue-500" />;
      case 'fire':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'ambulance':
        return <HeartPulse className="w-6 h-6 text-red-500" />;
      case 'disaster_management':
        return <AlertOctagon className="w-6 h-6 text-purple-500" />;
      case 'women_safety':
        return <ShieldAlert className="w-6 h-6 text-pink-500" />;
      case 'gas_leak':
        return <Flame className="w-6 h-6 text-orange-500" />;
      default:
        return <Phone className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* High-Alert Header */}
      <div className="rounded-3xl bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            24/7 First Responder Command
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            Metropolitan Emergency Directory & SOS Hub
          </h1>

          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            One-touch emergency dialing for verified state response teams. For any life-threatening situation, dial <strong>112</strong> immediately. Real-time CAD (Computer-Aided Dispatch) units are stationed across all municipal sectors.
          </p>

          {/* Instant SOS Dial Button */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="tel:112"
              className="px-8 py-4 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <Phone className="w-6 h-6 text-red-600" />
              DIAL 112 (ALL EMERGENCIES)
            </a>

            <a
              href="tel:108"
              className="px-6 py-4 rounded-2xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-sm border border-red-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <HeartPulse className="w-5 h-5 text-red-300" />
              Call 108 Ambulance
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('hotlines')}
            className={`px-5 py-2 rounded-lg transition-all ${
              activeTab === 'hotlines' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verified Emergency Hotlines
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-5 py-2 rounded-lg transition-all ${
              activeTab === 'guidelines' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Public Safety Protocols & CPR
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:block">
          Official Govt Toll-Free Numbers (Zero Charge)
        </span>
      </div>

      {/* TAB 1: VERIFIED HOTLINES & MAP */}
      {activeTab === 'hotlines' && (
        <div className="space-y-10">
          
          {/* Emergency Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map(em => (
              <div
                key={em.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      {getEmergencyIcon(em.category)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                      Priority {em.priorityOrder}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {em.serviceName}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {em.description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <p className="text-slate-400 text-[11px]">Coverage Area:</p>
                    <p className="font-semibold text-slate-800">{em.coverageArea}</p>
                    {em.address && (
                      <p className="text-slate-500 text-[11px] truncate pt-1">{em.address}</p>
                    )}
                  </div>
                </div>

                {/* Call Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Dial</span>
                    <p className="text-2xl font-black text-red-600 font-mono tracking-tight">
                      {em.emergencyNumber}
                    </p>
                  </div>

                  <a
                    href={`tel:${em.emergencyNumber}`}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency First Responder GIS Map */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Navigation className="w-5 h-5 text-red-600" />
                Emergency First Responder Locations on Map
              </h2>
              <span className="text-xs text-slate-500">
                AIIMS Trauma, Fire HQ, GGH, Police Stations
              </span>
            </div>

            <InteractiveMap
              hospitals={hospitals}
              emergency={contacts}
              initialCategory="emergency"
              height="460px"
            />
          </div>

        </div>
      )}

      {/* TAB 2: PUBLIC SAFETY PROTOCOLS */}
      {activeTab === 'guidelines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Medical CPR */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <HeartPulse className="w-6 h-6" />
              <h3 className="font-bold text-slate-900 text-lg">Adult Hands-Only CPR Protocol</h3>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
              <li><strong>Check Responsiveness:</strong> Tap shoulder firmly and ask loudly &quot;Are you okay?&quot;</li>
              <li><strong>Call for Help:</strong> Shout for someone to call <strong>108 / 112</strong> and bring an AED if available.</li>
              <li><strong>Position Hands:</strong> Place the heel of one hand in the center of the chest. Interlock fingers with the second hand.</li>
              <li><strong>Push Hard & Fast:</strong> Compress chest at 100-120 beats per minute (to the rhythm of &quot;Stayin&apos; Alive&quot;) at least 2 inches deep. Allow complete chest recoil.</li>
              <li>Continue until emergency medical paramedics arrive.</li>
            </ol>
          </div>

          {/* Card 2: Fire Breakout */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <Flame className="w-6 h-6" />
              <h3 className="font-bold text-slate-900 text-lg">Building Fire & Smoke Evacuation</h3>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
              <li><strong>Sound Alarm & Dial 101:</strong> Activate building manual pull stations immediately.</li>
              <li><strong>Never Use Elevators:</strong> Always use illuminated emergency stairwells. Elevators may lose power and entrap occupants.</li>
              <li><strong>Crawl Under Smoke:</strong> Smoke and toxic carbon monoxide rise. Stay low on hands and knees where cleaner air is present.</li>
              <li><strong>Test Doors Before Opening:</strong> Touch the back of your hand to door handles; if hot, do not open and find an alternate exit.</li>
              <li>Assemble at designated outdoor muster point and account for all individuals.</li>
            </ol>
          </div>

          {/* Card 3: Earthquake */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-purple-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-slate-900 text-lg">Earthquake Safety: Drop, Cover, Hold</h3>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
              <li><strong>DROP:</strong> Drop onto your hands and knees immediately to prevent being knocked down.</li>
              <li><strong>COVER:</strong> Cover your head and neck under a sturdy table, desk, or against an interior wall away from glass.</li>
              <li><strong>HOLD ON:</strong> Hold onto your shelter until shaking stops completely.</li>
              <li>If outdoors, move into an open area away from power lines, chimneys, and high-rise facades.</li>
            </ol>
          </div>

          {/* Card 4: Gas Leak */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-orange-600">
              <ZapOff className="w-6 h-6" />
              <h3 className="font-bold text-slate-900 text-lg">Piped Natural Gas (PNG) / LPG Leakage</h3>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
              <li><strong>Do NOT Switch On/Off Any Electrical Devices:</strong> A tiny electrical spark can ignite accumulated gas vapor.</li>
              <li><strong>Open All Windows & Doors:</strong> Facilitate natural ventilation to disperse gas rapidly.</li>
              <li><strong>Turn Off Main Control Valve:</strong> Close the isolation knob clockwise on the gas meter or regulator.</li>
              <li><strong>Evacuate & Call 1906:</strong> Step completely outside into fresh air before making the emergency call.</li>
            </ol>
          </div>

        </div>
      )}

    </div>
  );
}
