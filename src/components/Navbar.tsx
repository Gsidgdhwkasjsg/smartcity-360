'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Bus,
  HeartPulse,
  GraduationCap,
  Briefcase,
  AlertOctagon,
  Search,
  User,
  Menu,
  X,
  MapPin,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Building2,
  FileText,
  Radio,
  ExternalLink
} from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import GlobalSearchModal from './GlobalSearchModal';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'City Map', href: '/map', icon: MapPin },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Transportation', href: '/transportation', icon: Bus },
  { name: 'Healthcare', href: '/healthcare', icon: HeartPulse },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Public Services', href: '/services', icon: Briefcase },
  { name: 'Explore City', href: '/explore', icon: Compass },
  { name: 'Emergency', href: '/emergency', icon: AlertOctagon, isEmergency: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-[600] w-full transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-xl'
            : 'bg-slate-950 text-white border-b border-slate-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                  <span className="font-extrabold text-xl tracking-tighter">360</span>
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 opacity-0 group-hover:opacity-40 blur-sm transition-opacity" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-xl tracking-tight text-white">
                      SMARTCITY <span className="text-cyan-400 font-black">360</span>
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500/20 text-cyan-300 uppercase tracking-widest border border-cyan-500/30">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                    A Smarter City. A Better Tomorrow.
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href;
                if (link.isEmergency) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ml-1 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-400'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Tools: Weather Widget, Search Trigger, Account / Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Compact Weather Badge */}
              <div className="hidden lg:block">
                <WeatherWidget compact />
              </div>

              {/* Global Search Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all shadow-sm group"
                title="Search city portals (Cmd+K)"
              >
                <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-800 text-slate-400 rounded border border-slate-700">
                  ⌘K
                </kbd>
              </button>

              {/* Citizen / Admin Account Menu */}
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-slate-900 to-navy-800 border border-slate-700 text-xs font-semibold text-white hover:border-cyan-500/60 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden sm:inline">Citizen Portal</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-[700] text-xs">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="font-bold text-white">Smart City Unified ID</p>
                      <p className="text-[11px] text-slate-400">Citizen & Municipal Access</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4 text-cyan-400" />
                        Citizen Dashboard
                      </Link>
                      <Link
                        href="/complaints"
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <FileText className="w-4 h-4 text-amber-400" />
                        Report a Problem / Grievance
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Admin Command Center
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <Link
                        href="/account?action=login"
                        className="flex items-center justify-between px-3 py-2 text-cyan-400 hover:bg-cyan-500/10 rounded-xl font-bold transition-colors"
                      >
                        <span>Sign In / Register</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <div className="mb-3">
              <WeatherWidget compact />
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {NAV_LINKS.map(link => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 p-2.5 rounded-xl font-medium transition-colors ${
                      link.isEmergency
                        ? 'col-span-2 bg-red-600 text-white font-bold text-center justify-center'
                        : isActive
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/complaints"
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-slate-200 text-center font-semibold border border-slate-700"
              >
                File Complaint
              </Link>
              <Link
                href="/admin"
                className="py-2.5 px-3 rounded-xl bg-cyan-600 text-white text-center font-bold shadow-md shadow-cyan-600/20"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Spotlight Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
