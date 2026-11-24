'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, MapPin, HeartPulse, GraduationCap, Bus, Shield, Bell, ArrowRight, CornerDownLeft } from 'lucide-react';
import { dataService } from '@/services/dataService';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  url: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await dataService.searchAll(query);
        setResults(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'healthcare':
        return <HeartPulse className="w-4 h-4 text-red-500" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'transportation':
        return <Bus className="w-4 h-4 text-cyan-500" />;
      case 'explore city':
        return <MapPin className="w-4 h-4 text-amber-500" />;
      case 'emergency sos':
        return <Shield className="w-4 h-4 text-red-600" />;
      case 'announcement':
        return <Bell className="w-4 h-4 text-purple-500" />;
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search hospitals, colleges, bus routes, services, tourist spots, emergency..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-400 bg-slate-200 rounded hover:bg-slate-300 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Searching SMARTCITY 360 Knowledge Mesh...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Matching Results ({results.length})
              </div>
              {results.map(r => (
                <Link
                  key={`${r.category}-${r.id}`}
                  href={r.url}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs group-hover:border-cyan-400 transition-colors">
                      {getCategoryIcon(r.category)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {r.title}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{r.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No results found for &quot;<span className="font-semibold text-slate-700">{query}</span>&quot;.
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;Hospital&quot;, &quot;Metro&quot;, &quot;Water&quot;, &quot;112&quot;, or &quot;University&quot;</p>
            </div>
          ) : (
            <div className="py-8 px-4 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-2">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'AIIMS Hospital',
                  'Metro Line 1',
                  'SRM University',
                  '112 Emergency',
                  'Water Pipeline',
                  'Property Tax',
                  'Buddhist Stupa',
                  'EV Charging'
                ].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Select result
          </span>
          <span>SMARTCITY 360 Unified Citizen Directory</span>
        </div>
      </div>
    </div>
  );
}
