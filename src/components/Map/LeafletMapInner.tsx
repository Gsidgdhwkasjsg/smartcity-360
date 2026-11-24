'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import {
  Navigation,
  Phone,
  Clock,
  ExternalLink,
  Shield,
  Layers,
  Search,
  Crosshair,
  MapPin
} from 'lucide-react';
import { CITY_CENTER } from '@/data/seedData';
import { Hospital, EducationalInstitution, TransportationFacility, CityLocation, EmergencyContact } from '@/types';

// Custom SVG icon generator for Leaflet
function createSvgIcon(color: string, bg: string, glyph: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 46" width="36" height="46">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.35"/>
        </filter>
      </defs>
      <path d="M18 0 C8.06 0 0 8.06 0 18 C0 31.5 18 46 18 46 C18 46 36 31.5 36 18 C36 8.06 27.94 0 18 0 Z" fill="${bg}" filter="url(#shadow)"/>
      <circle cx="18" cy="18" r="14" fill="${color}"/>
      <text x="18" y="23" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="system-ui, sans-serif">${glyph}</text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'custom-map-marker',
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -42]
  });
}

interface MapProps {
  hospitals?: Hospital[];
  education?: EducationalInstitution[];
  transport?: TransportationFacility[];
  locations?: CityLocation[];
  emergency?: EmergencyContact[];
  height?: string;
  initialCategory?: string;
  selectedLocationId?: string;
}

export default function LeafletMapInner({
  hospitals = [],
  education = [],
  transport = [],
  locations = [],
  emergency = [],
  height = '620px',
  initialCategory = 'all',
  selectedLocationId
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [CITY_CENTER.lat, CITY_CENTER.lng],
      zoom: 13,
      scrollWheelZoom: true,
      zoomControl: false
    });

    // Custom Zoom control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | SMARTCITY 360 GIS',
      maxZoom: 19
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersGroupRef.current = null;
    };
  }, []);

  // Filtered items
  const filteredHospitals = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'hospital') return [];
    return hospitals.filter(
      h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [hospitals, activeCategory, searchQuery]);

  const filteredEducation = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'education') return [];
    return education.filter(
      e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [education, activeCategory, searchQuery]);

  const filteredTransport = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'transport') return [];
    return transport.filter(
      t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transport, activeCategory, searchQuery]);

  const filteredLocations = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'explore') return [];
    return locations.filter(
      l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [locations, activeCategory, searchQuery]);

  const filteredEmergency = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'emergency') return [];
    return emergency.filter(
      em =>
        em.lat &&
        em.lng &&
        (em.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (em.address && em.address.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [emergency, activeCategory, searchQuery]);

  // 2. Render Markers whenever filters or data change
  useEffect(() => {
    const markersGroup = markersGroupRef.current;
    if (!markersGroup) return;

    markersGroup.clearLayers();

    const hospitalIcon = createSvgIcon('#ef4444', '#b91c1c', '✚');
    const educationIcon = createSvgIcon('#2563eb', '#1d4ed8', '🎓');
    const transportIcon = createSvgIcon('#06b6d4', '#0891b2', '🚆');
    const exploreIcon = createSvgIcon('#f59e0b', '#d97706', '★');
    const emergencyIcon = createSvgIcon('#dc2626', '#991b1b', '🚨');

    // Hospitals
    filteredHospitals.forEach(h => {
      const popupHtml = `
        <div style="width: 270px; font-family: system-ui, sans-serif; overflow: hidden; border-radius: 12px; background: white;">
          ${h.imageUrl ? `<img src="${h.imageUrl}" alt="${h.name}" style="width: 100%; height: 110px; object-fit: cover; display: block;" />` : ''}
          <div style="padding: 12px;">
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #dc2626; margin-bottom: 4px;">${h.type.toUpperCase()} HOSPITAL</div>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.3;">${h.name}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${h.address}</div>
            <div style="font-size: 11px; color: #334155; margin-top: 6px;">Beds: <strong>${h.bedCapacity}</strong> • ICU: <strong>${h.icuBeds}</strong></div>
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
              <a href="tel:${h.phone}" style="color: #dc2626; font-size: 11px; font-weight: 700; text-decoration: none;">📞 ${h.phone}</a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}" target="_blank" rel="noreferrer" style="background: #0f172a; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">Directions</a>
            </div>
          </div>
        </div>
      `;
      L.marker([h.lat, h.lng], { icon: hospitalIcon })
        .bindPopup(popupHtml)
        .addTo(markersGroup);
    });

    // Education
    filteredEducation.forEach(e => {
      const popupHtml = `
        <div style="width: 270px; font-family: system-ui, sans-serif; overflow: hidden; border-radius: 12px; background: white;">
          ${e.imageUrl ? `<img src="${e.imageUrl}" alt="${e.name}" style="width: 100%; height: 110px; object-fit: cover; display: block;" />` : ''}
          <div style="padding: 12px;">
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #2563eb; margin-bottom: 4px;">${e.category.toUpperCase()}</div>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.3;">${e.name}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${e.location}</div>
            <div style="font-size: 11px; color: #334155; margin-top: 6px;">Capacity: <strong>${e.studentCapacity} Students</strong></div>
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
              ${e.website ? `<a href="${e.website}" target="_blank" rel="noreferrer" style="color: #2563eb; font-size: 11px; font-weight: 700; text-decoration: none;">Website</a>` : '<span></span>'}
              <a href="https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}" target="_blank" rel="noreferrer" style="background: #0f172a; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">Directions</a>
            </div>
          </div>
        </div>
      `;
      L.marker([e.lat, e.lng], { icon: educationIcon })
        .bindPopup(popupHtml)
        .addTo(markersGroup);
    });

    // Transport
    filteredTransport.forEach(t => {
      const popupHtml = `
        <div style="width: 260px; font-family: system-ui, sans-serif; padding: 14px; border-radius: 12px; background: white;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #0891b2; margin-bottom: 4px;">${t.type.replace('_', ' ').toUpperCase()}</div>
          <div style="font-size: 13px; font-weight: 700; color: #0f172a;">${t.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${t.address}</div>
          <div style="font-size: 11px; color: #334155; margin-top: 6px;">${t.operatingHours}</div>
          <div style="font-size: 11px; color: #0369a1; font-weight: 600; margin-top: 4px;">${t.fareInfo}</div>
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 10px; color: #16a34a; font-weight: 700;">● ${t.status}</span>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}" target="_blank" rel="noreferrer" style="background: #0f172a; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">Directions</a>
          </div>
        </div>
      `;
      L.marker([t.lat, t.lng], { icon: transportIcon })
        .bindPopup(popupHtml)
        .addTo(markersGroup);
    });

    // Explore / Landmarks
    filteredLocations.forEach(l => {
      const popupHtml = `
        <div style="width: 270px; font-family: system-ui, sans-serif; overflow: hidden; border-radius: 12px; background: white;">
          ${l.imageUrl ? `<img src="${l.imageUrl}" alt="${l.name}" style="width: 100%; height: 110px; object-fit: cover; display: block;" />` : ''}
          <div style="padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #d97706;">${l.category.replace('_', ' ').toUpperCase()}</span>
              <span style="font-size: 11px; font-weight: 800; color: #d97706;">★ ${l.rating}</span>
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.3;">${l.name}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${l.address}</div>
            <div style="font-size: 11px; color: #b45309; font-weight: 600; margin-top: 4px;">Fee: ${l.entryFee}</div>
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 10px; color: #64748b;">${l.openingHours}</span>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noreferrer" style="background: #0f172a; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">Visit</a>
            </div>
          </div>
        </div>
      `;
      L.marker([l.lat, l.lng], { icon: exploreIcon })
        .bindPopup(popupHtml)
        .addTo(markersGroup);
    });

    // Emergency
    filteredEmergency.forEach(em => {
      const popupHtml = `
        <div style="width: 250px; font-family: system-ui, sans-serif; padding: 14px; border-radius: 12px; background: white;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #dc2626; margin-bottom: 4px;">FIRST RESPONDER</div>
          <div style="font-size: 13px; font-weight: 700; color: #0f172a;">${em.serviceName}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${em.address || em.description}</div>
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
            <a href="tel:${em.emergencyNumber}" style="background: #dc2626; color: white; padding: 5px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none;">DIAL ${em.emergencyNumber}</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${em.lat},${em.lng}" target="_blank" rel="noreferrer" style="background: #0f172a; color: white; padding: 4px 8px; border-radius: 6px; font-size: 11px; text-decoration: none;">Route</a>
          </div>
        </div>
      `;
      L.marker([em.lat!, em.lng!], { icon: emergencyIcon })
        .bindPopup(popupHtml)
        .addTo(markersGroup);
    });
  }, [
    filteredHospitals,
    filteredEducation,
    filteredTransport,
    filteredLocations,
    filteredEmergency
  ]);

  // 3. Jump to selected location if prop provided
  useEffect(() => {
    if (!selectedLocationId || !mapInstanceRef.current) return;
    const allItems = [
      ...hospitals.map(h => ({ id: h.id, lat: h.lat, lng: h.lng })),
      ...education.map(e => ({ id: e.id, lat: e.lat, lng: e.lng })),
      ...transport.map(t => ({ id: t.id, lat: t.lat, lng: t.lng })),
      ...locations.map(l => ({ id: l.id, lat: l.lat, lng: l.lng })),
      ...emergency
        .filter(em => em.lat && em.lng)
        .map(em => ({ id: em.id, lat: em.lat!, lng: em.lng! }))
    ];
    const match = allItems.find(i => i.id === selectedLocationId);
    if (match) {
      mapInstanceRef.current.setView([match.lat, match.lng], 15);
    }
  }, [selectedLocationId, hospitals, education, transport, locations, emergency]);

  const handleLocateMe = () => {
    if ('geolocation' in navigator && mapInstanceRef.current) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          mapInstanceRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 15);
        },
        () => {
          mapInstanceRef.current?.setView([CITY_CENTER.lat, CITY_CENTER.lng], 13);
        }
      );
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
      {/* Top Map Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-[500] flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        {/* Search Input in Map */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search hospitals, transit, schools, attractions on map..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg text-xs font-medium">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-navy-900 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Pins
          </button>
          <button
            onClick={() => setActiveCategory('hospital')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === 'hospital'
                ? 'bg-red-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Hospitals ({hospitals.length})
          </button>
          <button
            onClick={() => setActiveCategory('transport')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === 'transport'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            Transit ({transport.length})
          </button>
          <button
            onClick={() => setActiveCategory('education')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === 'education'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Schools ({education.length})
          </button>
          <button
            onClick={() => setActiveCategory('explore')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === 'explore'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Attractions ({locations.length})
          </button>
          <button
            onClick={() => setActiveCategory('emergency')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === 'emergency'
                ? 'bg-red-700 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-700"></span>
            Emergency SOS
          </button>
        </div>
      </div>

      {/* Floating Center Re-focus & Geolocation Button */}
      <div className="absolute bottom-6 right-6 z-[500] flex flex-col gap-2">
        <button
          onClick={handleLocateMe}
          title="Detect Current Location"
          className="p-3 bg-white text-navy-900 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all"
        >
          <Crosshair className="w-5 h-5 text-cyan-600" />
        </button>
        <button
          onClick={() => {
            mapInstanceRef.current?.setView([CITY_CENTER.lat, CITY_CENTER.lng], 13);
          }}
          title="Reset to City Center"
          className="p-3 bg-white text-navy-900 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all"
        >
          <Layers className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Legend Badge at Bottom Left */}
      <div className="absolute bottom-6 left-6 z-[500] hidden sm:flex items-center gap-3 px-3.5 py-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg text-xs text-slate-600">
        <span className="font-semibold text-slate-900">Map Key:</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Hospitals</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Transit</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Education</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Attractions</span>
      </div>

      {/* Map DOM Element */}
      <div ref={mapContainerRef} style={{ height, width: '100%' }} />
    </div>
  );
}
