'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bookmark,
  FileText,
  Bell,
  Shield,
  CheckCircle2,
  LogOut,
  LogIn,
  Lock,
  ChevronRight,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { Complaint, CityLocation, Hospital } from '@/types';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'complaints' | 'saved' | 'notifications'>('profile');
  
  // Profile State
  const [profile, setProfile] = useState({
    name: 'K. Rajesh Kumar',
    email: 'rajesh.k@example.com',
    phone: '+91 98480 12345',
    ward: 'Ward 12 - Smart Central',
    address: 'Flat 402, Capital Meadows, Sector 3, Knowledge City, Amaravati'
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    emergencyBroadcasts: true,
    utilityAlerts: true
  });

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [savedLocations, setSavedLocations] = useState<CityLocation[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    Promise.all([
      dataService.getComplaints(),
      dataService.getCityLocations()
    ]).then(([cmps, locs]) => {
      setComplaints(cmps);
      const savedIds = dataService.getSavedLocationIds();
      setSavedLocations(locs.filter(l => savedIds.includes(l.id)));
    });
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleRemoveSaved = (id: string) => {
    dataService.toggleSaveLocation(id);
    setSavedLocations(prev => prev.filter(l => l.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-display">
              Citizen Single Sign-On (SSO)
            </h2>
            <p className="text-xs text-slate-500">
              Sign in to manage submitted grievances, track water meters, and view saved locations.
            </p>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email or Mobile Number</label>
              <input
                type="text"
                required
                defaultValue="rajesh.k@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password or OTP</label>
              <input
                type="password"
                required
                defaultValue="password123"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Sign In to Smart Portal
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="text-xs font-bold text-cyan-700 hover:underline"
            >
              ⚡ Click here for Instant Demo Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-cyan-500/20">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {profile.name}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                Verified Citizen ID
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.email} • {profile.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Switch to Admin Panel
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs border border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { id: 'profile', label: 'Citizen Profile', icon: User },
          { id: 'complaints', label: `My Grievances (${complaints.length})`, icon: FileText },
          { id: 'saved', label: `Saved Locations (${savedLocations.length})`, icon: Bookmark },
          { id: 'notifications', label: 'Alert Preferences', icon: Bell },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE MANAGEMENT */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Registered Citizen Information
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Update contact information linked to municipal billing and SMS emergency broadcasts.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile details saved successfully.
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Home Municipal Ward</label>
              <input
                type="text"
                value={profile.ward}
                onChange={e => setProfile({ ...profile, ward: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Residential Address</label>
              <textarea
                rows={3}
                value={profile.address}
                onChange={e => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl transition-all shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: MY GRIEVANCES */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              My Registered Grievance Tickets
            </h3>
            <Link
              href="/complaints"
              className="px-4 py-2 bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              + Lodge New Grievance
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.map(cmp => (
              <div
                key={cmp.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-cyan-800 text-sm">
                    {cmp.trackingId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                    {cmp.status.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{cmp.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{cmp.description}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Lodged: {new Date(cmp.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/complaints?tab=track&id=${cmp.trackingId}`}
                    className="font-bold text-cyan-700 hover:underline flex items-center gap-1"
                  >
                    Track Status <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED LOCATIONS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            Bookmarked City Locations & Facilities
          </h3>

          {savedLocations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No bookmarked locations yet. Browse <Link href="/explore" className="text-cyan-600 font-bold underline">Explore City</Link> and click the bookmark icon to save places.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedLocations.map(loc => (
                <div
                  key={loc.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-amber-700 mb-1">
                      <span>★ {loc.rating}</span>
                      <button
                        onClick={() => handleRemoveSaved(loc.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{loc.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{loc.address}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link
                      href={`/map?location=${loc.id}`}
                      className="font-semibold text-cyan-700 hover:underline"
                    >
                      Show on Map
                    </Link>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-lg bg-navy-900 text-white font-medium"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="max-w-xl bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg font-display">
            Civic Alert Preferences
          </h3>
          <p className="text-xs text-slate-500">
            Configure how you wish to receive municipal utility shutdowns and emergency notifications.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { key: 'emergencyBroadcasts', label: 'Emergency SOS Broadcasts (Severe weather, floods)', state: notifications.emergencyBroadcasts },
              { key: 'utilityAlerts', label: 'Scheduled Water & Power Maintenance Notices', state: notifications.utilityAlerts },
              { key: 'email', label: 'Email Digest & Grievance Resolution Reports', state: notifications.email },
              { key: 'sms', label: 'SMS Notifications for Field Ticket Updates', state: notifications.sms },
            ].map(item => (
              <label
                key={item.key}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <span className="font-semibold text-slate-800">{item.label}</span>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={e => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                />
              </label>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
