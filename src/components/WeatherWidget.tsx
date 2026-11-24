'use client';

import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Gauge, RefreshCw, Sun, CloudRain } from 'lucide-react';
import { WeatherData } from '@/types';
import { INITIAL_WEATHER } from '@/data/seedData';

export default function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Clock timer
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/weather');
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch {
      // use initial
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (cond: string) => {
    if (cond.includes('Rain')) return <CloudRain className="w-5 h-5 text-cyan-400" />;
    if (cond.includes('Clear')) return <Sun className="w-5 h-5 text-amber-400" />;
    return <CloudSun className="w-5 h-5 text-cyan-300" />;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-white text-xs backdrop-blur-md">
        {getWeatherIcon(weather.condition)}
        <span className="font-bold text-slate-100">{weather.temperature}°C</span>
        <span className="hidden sm:inline text-slate-400">|</span>
        <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">
          AQI {weather.aqi} ({weather.aqiStatus})
        </span>
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="text-slate-400 hover:text-cyan-400 transition-colors ml-1"
          title="Refresh Telemetry"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-200/90 shadow-lg relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 live-dot"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Live City Telemetry
            </span>
          </div>
          <p className="text-xs font-medium text-slate-700 font-mono mt-0.5">{currentTime}</p>
        </div>

        <button
          onClick={fetchWeather}
          disabled={loading}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-md">
            {getWeatherIcon(weather.condition)}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {weather.temperature}
              </span>
              <span className="text-lg font-bold text-slate-500">°C</span>
            </div>
            <p className="text-xs font-semibold text-slate-600">{weather.condition}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <Gauge className="w-3.5 h-3.5" /> AQI {weather.aqi} • {weather.aqiStatus}
          </span>
          <p className="text-[10px] text-slate-400 mt-1">PM2.5: 22 µg/m³</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Droplets className="w-4 h-4 text-cyan-600" />
          <span>Humidity: <strong className="text-slate-900">{weather.humidity}%</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Wind className="w-4 h-4 text-sky-600" />
          <span>Wind: <strong className="text-slate-900">{weather.windSpeed} km/h</strong></span>
        </div>
      </div>

      <div className="mt-3 text-[10px] text-slate-400 truncate">
        Source: {weather.source}
      </div>
    </div>
  );
}
