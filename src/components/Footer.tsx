'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
  Globe,
  Radio,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Emergency Hotlines Fast Strip */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-900/40 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>24/7 National & City Emergency Response Hotlines:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a href="tel:112" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-200 border border-red-500/40 hover:bg-red-600 hover:text-white transition-colors">
              <Phone className="w-3 h-3" /> All Emergencies: <span className="font-extrabold text-white text-sm">112</span>
            </a>
            <a href="tel:108" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors">
              Ambulance: <span className="font-bold text-white">108</span>
            </a>
            <a href="tel:101" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors">
              Fire: <span className="font-bold text-white">101</span>
            </a>
            <a href="tel:100" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors">
              Police: <span className="font-bold text-white">100</span>
            </a>
            <a href="tel:1091" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors">
              Women Safety: <span className="font-bold text-white">1091</span>
            </a>
            <a href="tel:1930" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors">
              Cyber Crime: <span className="font-bold text-white">1930</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & City Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-500 text-white font-extrabold text-lg shadow-md shadow-cyan-500/20">
                360
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  SMARTCITY <span className="text-cyan-400">360</span>
                </span>
                <p className="text-xs text-slate-400">A Smarter City. A Better Tomorrow.</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The official unified smart city digital portal delivering seamless citizen services, multimodal transit telemetry, real-time healthcare availability, open civic governance, and emergency response across the metropolitan region.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                Integrated Command & Control Center (ICCC), Sector 5, Amaravati
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                citizen.support@smartcity360.gov.in
              </p>
              <p className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                Municipal SCADA & Sensor Grid: <span className="text-emerald-400 font-semibold">Online & Synchronized</span>
              </p>
            </div>
          </div>

          {/* Quick Links: City Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 text-cyan-400">
              Public Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services#serv-001" className="hover:text-cyan-300 transition-colors">
                  Water Supply & Metering
                </Link>
              </li>
              <li>
                <Link href="/services#serv-002" className="hover:text-cyan-300 transition-colors">
                  Electricity & Solar Net-Metering
                </Link>
              </li>
              <li>
                <Link href="/services#serv-004" className="hover:text-cyan-300 transition-colors">
                  Property Tax Assessment
                </Link>
              </li>
              <li>
                <Link href="/services#serv-005" className="hover:text-cyan-300 transition-colors">
                  Civil Birth & Death Registry
                </Link>
              </li>
              <li>
                <Link href="/services#serv-003" className="hover:text-cyan-300 transition-colors">
                  Solid Waste & Debris Pickup
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="text-amber-400 font-semibold hover:underline">
                  File Citizen Grievance
                </Link>
              </li>
            </ul>
          </div>

          {/* Transportation & Healthcare */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 text-cyan-400">
              Urban Infrastructure
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/transportation" className="hover:text-cyan-300 transition-colors">
                  Metro Rail Schedules
                </Link>
              </li>
              <li>
                <Link href="/transportation" className="hover:text-cyan-300 transition-colors">
                  Smart Bus Terminals (ISBT)
                </Link>
              </li>
              <li>
                <Link href="/healthcare" className="hover:text-cyan-300 transition-colors">
                  Govt & Private Hospitals
                </Link>
              </li>
              <li>
                <Link href="/healthcare" className="hover:text-cyan-300 transition-colors">
                  24/7 Trauma Centers & ICUs
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-cyan-300 transition-colors">
                  Universities & Libraries
                </Link>
              </li>
              <li>
                <Link href="/environment" className="hover:text-cyan-300 transition-colors">
                  Air Quality & Weather Telemetry
                </Link>
              </li>
            </ul>
          </div>

          {/* Citizen Governance & Admin */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 text-cyan-400">
              Citizen Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/map" className="hover:text-cyan-300 transition-colors">
                  Interactive GIS City Map
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300 transition-colors">
                  City Statistics Dashboard
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-cyan-300 transition-colors">
                  Explore City & Heritage
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-cyan-300 transition-colors">
                  Official City Notices
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-cyan-300 transition-colors">
                  Citizen Profile & Saved Pins
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-emerald-400 font-semibold hover:underline">
                  Municipal Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Verification and Transparency Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300 mb-1">
                Official Information & Real-Time Telemetry Transparency Statement:
              </p>
              <p>
                SMARTCITY 360 publishes official metropolitan information verified through the Directorate of Municipal Administration, Department of Health, and Metropolitan Transit Authority. Live telemetry data (Weather, AQI, and Municipal SCADA indicators) are polled via real-time sensory API grids (including Open-Meteo). Simulated or sample entries for demonstrative municipal services are explicitly designated with badge markers to maintain strict civic transparency and prevent misinformation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Accessibility & Security */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} SMARTCITY 360 Digital Municipal Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> W3C A11y Compliant
            </span>
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-slate-400" /> Digital Personal Data Protection (DPDP) Act
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
