'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  GraduationCap,
  School,
  BookOpen,
  Library,
  Award,
  Search,
  Navigation,
  ExternalLink,
  Phone,
  Mail,
  Users,
  Calendar,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { dataService } from '@/services/dataService';
import { EducationalInstitution } from '@/types';

export default function EducationPage() {
  const [institutions, setInstitutions] = useState<EducationalInstitution[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dataService.getEducationalInstitutions().then(setInstitutions);
  }, []);

  const filtered = useMemo(() => {
    return institutions.filter(inst => {
      const matchCat = selectedCategory === 'all' || inst.category === selectedCategory;
      const matchQuery =
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [institutions, selectedCategory, searchQuery]);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'university':
        return { label: 'University', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'college':
        return { label: 'Degree College', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'school':
        return { label: 'K-12 School', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'technical_institute':
        return { label: 'Technical Institute', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'library':
        return { label: 'Public Smart Library', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      default:
        return { label: 'Skill Center', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            Knowledge & Higher Education Directorate
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Education, Universities & Research Institutes
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Metropolitan directory of premier universities, design institutes, STEM schools, digital libraries, and youth skill enhancement centers across Amaravati.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            312 Accredited Institutions
          </span>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            Education & Campus Geospatial Map
          </h2>
          <span className="text-xs text-slate-500">
            Blue markers denote educational campuses and public libraries
          </span>
        </div>

        <InteractiveMap
          education={institutions}
          initialCategory="education"
          height="450px"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search universities, courses, robotics, CBSE..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'All Institutions' },
            { id: 'university', label: 'Universities' },
            { id: 'technical_institute', label: 'Technical / Design' },
            { id: 'college', label: 'Colleges' },
            { id: 'school', label: 'Schools' },
            { id: 'library', label: 'Libraries' },
            { id: 'skill_center', label: 'Skill Centers' },
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

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(inst => {
          const badge = getCategoryBadge(inst.category);
          return (
            <div
              key={inst.id}
              id={inst.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all"
            >
              <div>
                {/* Photo */}
                {inst.imageUrl && (
                  <div className="relative h-44 w-full bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={inst.imageUrl} alt={inst.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border backdrop-blur-md shadow ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {inst.location}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Students</span>
                      <strong className="text-slate-900 font-bold">{inst.studentCapacity.toLocaleString()}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Established</span>
                      <strong className="text-slate-900 font-bold">{inst.establishedYear}</strong>
                    </div>
                  </div>

                  {inst.affiliation && (
                    <div className="mt-3 text-xs text-slate-600 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{inst.affiliation}</span>
                    </div>
                  )}

                  {/* Courses */}
                  <div className="mt-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Featured Programs
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {inst.courses.map((c, idx) => (
                        <span key={idx} className="text-[10px] bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-md border border-blue-100">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {inst.website ? (
                    <a
                      href={inst.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Portal
                    </a>
                  ) : (
                    <a
                      href={`tel:${inst.phone}`}
                      className="flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                  )}

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${inst.lat},${inst.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Directions
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
