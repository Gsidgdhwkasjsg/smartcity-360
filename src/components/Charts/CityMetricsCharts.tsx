'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Activity, Zap, Users, CheckCircle2, TrendingUp, Info } from 'lucide-react';

const aqiHourlyData = [
  { time: '00:00', aqi: 42, pm25: 18, temp: 22 },
  { time: '03:00', aqi: 38, pm25: 14, temp: 21 },
  { time: '06:00', aqi: 49, pm25: 22, temp: 23 },
  { time: '09:00', aqi: 68, pm25: 35, temp: 27 },
  { time: '12:00', aqi: 62, pm25: 30, temp: 31 },
  { time: '15:00', aqi: 54, pm25: 26, temp: 32 },
  { time: '18:00', aqi: 72, pm25: 38, temp: 28 },
  { time: '21:00', aqi: 58, pm25: 29, temp: 25 },
  { time: 'Now', aqi: 52, pm25: 24, temp: 27 },
];

const energyGridData = [
  { month: 'Jun', solar: 18.2, grid: 24.5, hydro: 4.1 },
  { month: 'Jul', solar: 19.5, grid: 23.0, hydro: 5.2 },
  { month: 'Aug', solar: 21.0, grid: 21.8, hydro: 6.0 },
  { month: 'Sep', solar: 22.4, grid: 20.2, hydro: 5.8 },
  { month: 'Oct', solar: 23.8, grid: 19.1, hydro: 4.9 },
  { month: 'Nov', solar: 24.8, grid: 17.5, hydro: 4.5 },
];

const transitModeData = [
  { name: 'Metro Line 1 & 2', value: 85000, color: '#0ea5e9' },
  { name: 'Electric Smart Buses', value: 62000, color: '#06b6d4' },
  { name: 'Suburban Railway', value: 45000, color: '#3b82f6' },
  { name: 'EV Shuttles & E-Rickshaws', value: 24000, color: '#10b981' },
];

const grievanceResolutionData = [
  { month: 'Jun', lodged: 480, resolved: 442, rate: '92%' },
  { month: 'Jul', lodged: 530, resolved: 495, rate: '93%' },
  { month: 'Aug', lodged: 620, resolved: 589, rate: '95%' },
  { month: 'Sep', lodged: 590, resolved: 572, rate: '97%' },
  { month: 'Oct', lodged: 640, resolved: 618, rate: '96%' },
  { month: 'Nov', lodged: 412, resolved: 398, rate: '96.6%' },
];

export default function CityMetricsCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-96 w-full animate-pulse rounded-2xl bg-slate-100" />;
  }

  return (
    <div className="space-y-8">
      {/* 2-Column Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: AQI 24-Hour Trend */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-50 text-cyan-700">
                  <Activity className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-slate-900 text-lg">24-Hour Air Quality Index (AQI)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Continuous telemetry from 14 Urban Air Monitoring Stations
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
              Good (Avg 52)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aqiHourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '0.75rem',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, name: string) => [
                    `${value} ${name === 'aqi' ? 'AQI' : 'µg/m³'}`,
                    name === 'aqi' ? 'Air Quality Index' : 'PM2.5 Particles'
                  ]}
                />
                <Area type="monotone" dataKey="aqi" stroke="#0891b2" strokeWidth={2.5} fillOpacity={1} fill="url(#aqiGrad)" name="aqi" />
                <Line type="monotone" dataKey="pm25" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="pm25" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Air Quality (AQI)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> PM2.5 (Fine Particulates)
            </span>
            <span className="text-[11px] text-slate-400">CPCB Verified Sensor Mesh</span>
          </div>
        </div>

        {/* Chart 2: Clean Energy vs Grid Generation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <Zap className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Clean Energy Generation (MW)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Monthly breakdown: Solar parks & rooftop net-metering vs Grid
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.2% YoY
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyGridData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="MW" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '0.75rem',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`${value} Megawatts`, 'Power Generated']}
                />
                <Bar dataKey="solar" name="Solar Clean Power" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="grid" name="Conventional Grid" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hydro" name="Hydro & Bio" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Solar (24.8 MW)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Conventional Grid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Hydro/Bio
            </span>
          </div>
        </div>

        {/* Chart 3: Transit Modal Share */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-sky-50 text-sky-700">
                  <Users className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Daily Transit Ridership Share</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                216,000+ daily public journeys across smart multi-modal transit
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Live Fare Card Aggregates
            </span>
          </div>

          <div className="h-64 w-full flex flex-col sm:flex-row items-center justify-center">
            <div className="w-full sm:w-1/2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transitModeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {transitModeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '0.75rem',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                    formatter={(val: any) => [`${Number(val).toLocaleString()} Commuters`, 'Daily Trips']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              {transitModeData.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-slate-700 font-medium">{t.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{t.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
            <span>Integrated Smart Transit Pass Enabled</span>
            <span className="text-cyan-700 font-medium">94.8% on-time transit punctuality</span>
          </div>
        </div>

        {/* Chart 4: Grievance Resolution Performance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Citizen Grievance Resolution SLA</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Monthly citizen complaints lodged vs successfully resolved
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
              96.6% SLA Compliance
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grievanceResolutionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '0.75rem',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any, name: string) => [
                    `${val} Complaints`,
                    name === 'lodged' ? 'Grievances Lodged' : 'Successfully Resolved'
                  ]}
                />
                <Bar dataKey="lodged" name="Lodged" fill="#f87171" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Grievances Lodged
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Resolved by Municipal Depts
            </span>
            <span className="text-[11px] text-slate-400">Avg Resolution: 34 Hours</span>
          </div>
        </div>

      </div>
    </div>
  );
}
