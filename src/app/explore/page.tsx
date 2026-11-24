'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Clock,
  Ticket,
  Star,
  Search,
  Navigation,
  Bookmark,
  Share2,
  ExternalLink,
  Tag,
  Trees,
  ShoppingBag,
  Building,
  Landmark
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { CityLocation } from '@/types';

export default function ExploreCityPage() {
  const [locations, setLocations] = useState<CityLocation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    dataService.getCityLocations().then(setLocations);
    setSavedIds(dataService.getSavedLocationIds());
  }, []);

  const toggleSave = (id: string) => {
    dataService.toggleSaveLocation(id);
    setSavedIds(dataService.getSavedLocationIds());
  };

  const filtered = useMemo(() => {
    return locations.filter(loc => {
      const matchCat = selectedCategory === 'all' || loc.category === selectedCategory;
      const matchQuery =
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [locations, selectedCategory, searchQuery]);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'historical_heritage':
        return { label: 'Historical Heritage', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'tourist_attraction':
        return { label: 'Tourist Attraction', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'park_recreation':
        return { label: 'Parks & Eco-Sanctuary', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'government_building':
        return { label: 'Government Landmark', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'shopping_center':
        return { label: 'Retail & Shopping', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: 'Cultural Center', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            Tourism, Heritage & Metropolitan Landmarks
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Explore City: Heritage, Culture & Leisure
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Discover iconic Buddhist heritage stupas, serene riverfront promenades, sprawling eco-parks, state-of-the-art judicial architecture, and vibrant shopping hubs.
          </p>
        </div>

        <Link
          href="/map"
          className="px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition-colors shadow-xs flex items-center gap-2"
        >
          <MapPin className="w-4 h-4 text-cyan-400" />
          View All on GIS Map
        </Link>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search attractions, stupa, boating, mall..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'All Places' },
            { id: 'tourist_attraction', label: 'Top Attractions' },
            { id: 'historical_heritage', label: 'Historical Heritage' },
            { id: 'park_recreation', label: 'Parks & Eco' },
            { id: 'government_building', label: 'Civic Architecture' },
            { id: 'shopping_center', label: 'Shopping & Malls' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === tab.id
                  ? 'bg-white text-navy-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(loc => {
          const badge = getCategoryBadge(loc.category);
          const isSaved = savedIds.includes(loc.id);

          return (
            <div
              key={loc.id}
              id={loc.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all group"
            >
              <div>
                {/* Photo & Rating */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.imageUrl}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border backdrop-blur-md shadow ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold shadow">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{loc.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-cyan-700 transition-colors">
                      {loc.name}
                    </h3>
                    <button
                      onClick={() => toggleSave(loc.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-amber-50 border-amber-300 text-amber-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Location'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {loc.address}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {loc.description}
                  </p>

                  {/* Hours & Entry Fee */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{loc.openingHours}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{loc.entryFee}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {loc.highlights.map((h, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/map?location=${loc.id}`}
                    className="font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Show on Map
                  </Link>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Get Directions
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
