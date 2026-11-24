'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Wind,
  Droplets,
  Zap,
  Trash2,
  Trees,
  Sun,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Gauge,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  CloudRain
} from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';
import CityMetricsCharts from '@/components/Charts/CityMetricsCharts';
import { dataService } from '@/services/dataService';
import { WeatherData } from '@/types';
import { INITIAL_WEATHER } from '@/data/seedData';

export default function EnvironmentPage() {
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await dataService.getWeather();
      setWeather(data);
    } catch {
      // initial
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            Ecological Command & Urban Micro-Climate Network
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Environment, Air Quality & Smart Infrastructure
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Hyperlocal telemetry from 14 ambient air monitoring stations, ultrasonic water quality sensors, solar clean energy micro-grids, and automated IoT solid waste compactors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot"></span>
            Sensors Synchronized via Open-Meteo
          </span>
          <button
            onClick={fetchWeather}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-cyan-700 hover:bg-slate-50 transition-colors shadow-xs"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Top Telemetry Highlight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Weather Card */}
        <div className="md:col-span-1">
          <WeatherWidget />
        </div>

        {/* Real-Time Air Quality Detailed Breakdown */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Atmospheric Pollutant Spectrum (CPCB Standards)
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                AQI {weather.aqi} • Satisfactory
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Sensory analysis shows safe particulate thresholds across all capital sectors. Ideal for outdoor recreation and athletics.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">PM2.5</span>
                <strong className="text-slate-900 font-bold text-sm">22 µg/m³</strong>
                <span className="text-[9px] text-emerald-600 font-semibold block">Good</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">PM10</span>
                <strong className="text-slate-900 font-bold text-sm">48 µg/m³</strong>
                <span className="text-[9px] text-emerald-600 font-semibold block">Good</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">NO₂</span>
                <strong className="text-slate-900 font-bold text-sm">14 ppb</strong>
                <span className="text-[9px] text-emerald-600 font-semibold block">Safe</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">SO₂</span>
                <strong className="text-slate-900 font-bold text-sm">6 ppb</strong>
                <span className="text-[9px] text-emerald-600 font-semibold block">Safe</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">CO</span>
                <strong className="text-slate-900 font-bold text-sm">0.4 ppm</strong>
                <span className="text-[9px] text-emerald-600 font-semibold block">Clean</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">Ozone</span>
                <strong className="text-slate-900 font-bold text-sm">28 ppb</strong>
                <span className="text-[9px] text-emerald-600 font-semibold block">Safe</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Verified Source: Continuous Ambient Air Quality Monitoring Stations (CAAQMS)</span>
            <span className="text-emerald-700 font-semibold">● Live Auto-Sync</span>
          </div>
        </div>

      </div>

      {/* Deep Analytics & Telemetry Charts */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-display">
          24-Hour Environmental & Renewable Generation Dynamics
        </h2>
        <CityMetricsCharts />
      </div>

      {/* Smart Infrastructure Indicators (Water, Waste, Solar, Lighting) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Water Quality */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Water Quality Index</h4>
          <p className="text-2xl font-black text-cyan-700 font-display">94.2 / 100</p>
          <p className="text-xs text-slate-500">
            Continuous testing across Krishna Water Treatment Plants: pH 7.4, Turbidity 0.8 NTU, Dissolved Oxygen 7.8 mg/L.
          </p>
          <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100">
            Verified by Public Health Engineering
          </div>
        </div>

        {/* Card 2: Clean Solar Grid */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Solar Clean Energy</h4>
          <p className="text-2xl font-black text-amber-600 font-display">24.8 MW</p>
          <p className="text-xs text-slate-500">
            Daily generation from rooftop photovoltaic panels and Neerukonda Solar Farm, displacing 18.4 metric tons of CO2 daily.
          </p>
          <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100">
            Verified by Renewable Development Board
          </div>
        </div>

        {/* Card 3: Smart Waste Compactor IoT */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Smart Waste Management</h4>
          <p className="text-2xl font-black text-emerald-700 font-display">94.6% Cleared</p>
          <p className="text-xs text-slate-500">
            120 ultrasonic fill-level sensor bins dispatches automated route optimization for 42 electric garbage compactor trucks.
          </p>
          <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100">
            Automated Municipal Fleet Tracking
          </div>
        </div>

        {/* Card 4: Smart LED Lighting */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Connected Streetlights</h4>
          <p className="text-2xl font-black text-purple-700 font-display">34,000 LEDs</p>
          <p className="text-xs text-slate-500">
            Centrally controlled dimming luminaires saving 32% power annually with automated outage notifications within 10 seconds.
          </p>
          <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100">
            SCADA Central Lighting Controller
          </div>
        </div>

      </div>

    </div>
  );
}
