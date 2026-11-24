'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Hospital, EducationalInstitution, TransportationFacility, CityLocation, EmergencyContact } from '@/types';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  hospitals?: Hospital[];
  education?: EducationalInstitution[];
  transport?: TransportationFacility[];
  locations?: CityLocation[];
  emergency?: EmergencyContact[];
  height?: string;
  initialCategory?: string;
  selectedLocationId?: string;
}

const DynamicMap = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-slate-400 p-12 min-h-[500px]">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin" />
        <MapPin className="w-6 h-6 text-cyan-400 absolute" />
      </div>
      <p className="text-base font-semibold text-slate-200">Initializing SMARTCITY 360 GIS Map Engine...</p>
      <p className="text-xs text-slate-500 mt-1">Connecting to OpenStreetMap telemetry & spatial markers</p>
    </div>
  )
});

export default function InteractiveMap(props: InteractiveMapProps) {
  return <DynamicMap {...props} />;
}
