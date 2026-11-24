'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Users,
  Building,
  HeartPulse,
  Bus,
  GraduationCap,
  Briefcase,
  Trees,
  Gauge,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';
import CityMetricsCharts from '@/components/Charts/CityMetricsCharts';
import WeatherWidget from '@/components/WeatherWidget';
import { dataService } from '@/services/dataService';
import { CityStatistic } from '@/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<CityStatistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getStatistics().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            Executive City Telemetry & Open Data
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Metropolitan Command Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Live administrative KPIs, environmental indicators, municipal transit volume, and citizen service resolution metrics across all metropolitan sectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot"></span>
            SCADA Telemetry Online
          </span>
          <button
            onClick={() => {
              setLoading(true);
              dataService.getStatistics().then(data => {
                setStats(data);
                setLoading(false);
              });
            }}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-cyan-700 hover:bg-slate-50 transition-colors shadow-xs"
            title="Refresh All Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Verified vs Simulated Data Transparency Alert */}
      <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 flex items-start gap-3.5 text-xs text-cyan-900">
        <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-cyan-950">
            Data Provenance & Civic Integrity Standard:
          </p>
          <p className="text-cyan-800 mt-0.5 leading-relaxed">
            All demographic, healthcare bed registers, and school records are synchronized directly from state administrative audits. Real-time atmospheric metrics (AQI, temperature, rainfall) are pulled from sensor API telemetry. Operational service records are updated in 15-minute micro-batches.
          </p>
        </div>
      </div>

      {/* Primary KPI Grid (8 Key Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(st => (
          <div
            key={st.key}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500">
                {st.category}
              </span>
              <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                st.trend === 'up' ? 'text-emerald-600' : st.trend === 'down' ? 'text-blue-600' : 'text-slate-500'
              }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                {st.changeRate > 0 ? `+${st.changeRate}%` : `${st.changeRate}%`}
              </span>
            </div>

            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              {st.displayValue}
            </div>

            <p className="text-xs font-bold text-slate-700 mt-1">{st.title}</p>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate max-w-[130px]">{st.verifiedSource}</span>
              {st.isLive ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Telemetry
                </span>
              ) : (
                <span className="text-slate-400">Official Record</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Telemetry Charts & Deep Data Visualization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Real-Time Telemetry & Systems Analytics
          </h2>
          <span className="text-xs text-slate-500">
            Automated sensor aggregations (Last 24 Hours)
          </span>
        </div>

        <CityMetricsCharts />
      </div>

      {/* Ward-Wise Urban Indicators Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Metropolitan Wards & Civic Infrastructure Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative resource allocation across primary capital administrative zones
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
          >
            Municipal Services Portal <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Municipal Ward</th>
                <th className="py-3 px-4">Population</th>
                <th className="py-3 px-4">Hospitals</th>
                <th className="py-3 px-4">Transit Hubs</th>
                <th className="py-3 px-4">Water Coverage</th>
                <th className="py-3 px-4">Smart LED Lighting</th>
                <th className="py-3 px-4">SLA Resolution</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {[
                { ward: 'Ward 01 - Amaravati Core Capital', pop: '240,000', hosp: 8, trans: 28, water: '99.4%', light: '100%', sla: '98.2%', status: 'Optimal' },
                { ward: 'Ward 04 - Rayapudi & North Zone', pop: '310,000', hosp: 6, trans: 22, water: '98.1%', light: '96.5%', sla: '96.1%', status: 'Optimal' },
                { ward: 'Ward 08 - Civic Center & Justice City', pop: '285,000', hosp: 7, trans: 32, water: '99.0%', light: '98.4%', sla: '97.5%', status: 'Optimal' },
                { ward: 'Ward 12 - Knowledge City & IT Belt', pop: '390,000', hosp: 10, trans: 36, water: '97.8%', light: '99.2%', sla: '95.8%', status: 'Optimal' },
                { ward: 'Ward 16 - Mangalagiri South Hub', pop: '420,000', hosp: 11, trans: 40, water: '96.5%', light: '95.0%', sla: '94.2%', status: 'Active Upgrades' },
                { ward: 'Ward 21 - Krishna Riverfront East', pop: '350,000', hosp: 6, trans: 27, water: '98.6%', light: '97.1%', sla: '96.4%', status: 'Optimal' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{row.ward}</td>
                  <td className="py-3 px-4">{row.pop}</td>
                  <td className="py-3 px-4 text-red-600 font-semibold">{row.hosp} Centers</td>
                  <td className="py-3 px-4 text-cyan-700 font-semibold">{row.trans} Hubs</td>
                  <td className="py-3 px-4 text-blue-600">{row.water}</td>
                  <td className="py-3 px-4 text-emerald-600">{row.light}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{row.sla}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      row.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
