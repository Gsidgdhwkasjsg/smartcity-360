import {
  Hospital,
  EducationalInstitution,
  TransportationFacility,
  PublicService,
  EmergencyContact,
  CityLocation,
  Announcement,
  CityStatistic,
  WeatherData,
  Complaint
} from '../types';

import {
  INITIAL_STATISTICS,
  INITIAL_HOSPITALS,
  INITIAL_EDUCATIONAL_INSTITUTIONS,
  INITIAL_TRANSPORTATION_FACILITIES,
  INITIAL_PUBLIC_SERVICES,
  INITIAL_EMERGENCY_CONTACTS,
  INITIAL_CITY_LOCATIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_COMPLAINTS,
  INITIAL_WEATHER,
  CITY_CENTER
} from '../data/seedData';

import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  COMPLAINTS: 'smartcity360_complaints',
  ANNOUNCEMENTS: 'smartcity360_announcements',
  SAVED_LOCATIONS: 'smartcity360_saved_locations',
  USER_PROFILE: 'smartcity360_user_profile',
  CUSTOM_LOCATIONS: 'smartcity360_custom_locations'
};

class DataService {
  private inMemoryComplaints: Complaint[] = [...INITIAL_COMPLAINTS];
  private inMemoryAnnouncements: Announcement[] = [...INITIAL_ANNOUNCEMENTS];
  private inMemoryLocations: CityLocation[] = [...INITIAL_CITY_LOCATIONS];

  private getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private saveToLocalStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }

  // --- Statistics ---
  async getStatistics(): Promise<CityStatistic[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('city_statistics').select('*');
        if (!error && data && data.length > 0) return data as CityStatistic[];
      } catch (e) {
        console.warn('Supabase statistics fetch error, using seed:', e);
      }
    }
    return INITIAL_STATISTICS;
  }

  // --- Hospitals ---
  async getHospitals(): Promise<Hospital[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('hospitals').select('*');
        if (!error && data && data.length > 0) return data as Hospital[];
      } catch (e) {
        console.warn('Supabase hospitals fetch error, using seed:', e);
      }
    }
    return INITIAL_HOSPITALS;
  }

  // --- Education ---
  async getEducationalInstitutions(): Promise<EducationalInstitution[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('educational_institutions').select('*');
        if (!error && data && data.length > 0) return data as EducationalInstitution[];
      } catch (e) {
        console.warn('Supabase education fetch error, using seed:', e);
      }
    }
    return INITIAL_EDUCATIONAL_INSTITUTIONS;
  }

  // --- Transportation ---
  async getTransportationFacilities(): Promise<TransportationFacility[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('transportation_facilities').select('*');
        if (!error && data && data.length > 0) return data as TransportationFacility[];
      } catch (e) {
        console.warn('Supabase transport fetch error, using seed:', e);
      }
    }
    return INITIAL_TRANSPORTATION_FACILITIES;
  }

  // --- Public Services ---
  async getPublicServices(): Promise<PublicService[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('public_services').select('*');
        if (!error && data && data.length > 0) return data as PublicService[];
      } catch (e) {
        console.warn('Supabase services fetch error, using seed:', e);
      }
    }
    return INITIAL_PUBLIC_SERVICES;
  }

  // --- Emergency Contacts ---
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('emergency_contacts').select('*').order('priority_order');
        if (!error && data && data.length > 0) return data as EmergencyContact[];
      } catch (e) {
        console.warn('Supabase emergency fetch error, using seed:', e);
      }
    }
    return INITIAL_EMERGENCY_CONTACTS;
  }

  // --- City Locations ---
  async getCityLocations(): Promise<CityLocation[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('city_locations').select('*');
        if (!error && data && data.length > 0) return data as CityLocation[];
      } catch (e) {
        console.warn('Supabase locations fetch error, using seed:', e);
      }
    }
    const localCustom = this.getFromLocalStorage<CityLocation[]>(STORAGE_KEYS.CUSTOM_LOCATIONS, []);
    return [...this.inMemoryLocations, ...localCustom];
  }

  // --- Announcements ---
  async getAnnouncements(): Promise<Announcement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as Announcement[];
      } catch (e) {
        console.warn('Supabase announcements fetch error, using seed:', e);
      }
    }
    const local = this.getFromLocalStorage<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, []);
    const merged = [...local, ...this.inMemoryAnnouncements];
    // deduplicate by id
    const seen = new Set();
    return merged.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  async createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
    const newRecord: Announcement = {
      ...announcement,
      id: `anc-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('announcements').insert([newRecord]);
      } catch (e) {
        console.warn('Supabase insert failed:', e);
      }
    }

    this.inMemoryAnnouncements.unshift(newRecord);
    const existing = this.getFromLocalStorage<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, []);
    this.saveToLocalStorage(STORAGE_KEYS.ANNOUNCEMENTS, [newRecord, ...existing]);
    return newRecord;
  }

  // --- Complaints Management ---
  async getComplaints(): Promise<Complaint[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('complaints').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as Complaint[];
      } catch (e) {
        console.warn('Supabase complaints fetch error:', e);
      }
    }
    const local = this.getFromLocalStorage<Complaint[]>(STORAGE_KEYS.COMPLAINTS, []);
    const combined = [...local, ...this.inMemoryComplaints];
    const map = new Map<string, Complaint>();
    combined.forEach(c => {
      // local overrides in-memory if duplicate
      if (!map.has(c.id) || !map.has(c.trackingId)) {
        map.set(c.trackingId, c);
      }
    });
    return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getComplaintByTrackingId(trackingId: string): Promise<Complaint | null> {
    const cleanId = trackingId.trim().toUpperCase();
    const all = await this.getComplaints();
    return all.find(c => c.trackingId.toUpperCase() === cleanId) || null;
  }

  async createComplaint(data: Omit<Complaint, 'id' | 'trackingId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Complaint> {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `SC360-${new Date().getFullYear()}-${randomHex}`;
    const newComplaint: Complaint = {
      ...data,
      id: `cmp-${Date.now()}`,
      trackingId,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('complaints').insert([newComplaint]);
      } catch (e) {
        console.warn('Supabase insert complaint failed:', e);
      }
    }

    this.inMemoryComplaints.unshift(newComplaint);
    const existing = this.getFromLocalStorage<Complaint[]>(STORAGE_KEYS.COMPLAINTS, []);
    this.saveToLocalStorage(STORAGE_KEYS.COMPLAINTS, [newComplaint, ...existing]);
    return newComplaint;
  }

  async updateComplaint(
    idOrTrackingId: string,
    updates: Partial<Pick<Complaint, 'status' | 'assignedDepartment' | 'assignedOfficer' | 'resolutionNotes' | 'priority'>>
  ): Promise<Complaint | null> {
    const all = await this.getComplaints();
    const target = all.find(c => c.id === idOrTrackingId || c.trackingId === idOrTrackingId);
    if (!target) return null;

    const updated: Complaint = {
      ...target,
      ...updates,
      updatedAt: new Date().toISOString(),
      resolutionDate: updates.status === 'resolved' ? new Date().toISOString() : target.resolutionDate
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('complaints').update(updated).eq('id', target.id);
      } catch (e) {
        console.warn('Supabase update complaint failed:', e);
      }
    }

    const local = this.getFromLocalStorage<Complaint[]>(STORAGE_KEYS.COMPLAINTS, []);
    const updatedLocal = local.map(c => c.id === target.id ? updated : c);
    if (!updatedLocal.some(c => c.id === target.id)) {
      updatedLocal.unshift(updated);
    }
    this.saveToLocalStorage(STORAGE_KEYS.COMPLAINTS, updatedLocal);

    this.inMemoryComplaints = this.inMemoryComplaints.map(c => c.id === target.id ? updated : c);
    return updated;
  }

  // --- Bookmarked / Saved Locations ---
  getSavedLocationIds(): string[] {
    return this.getFromLocalStorage<string[]>(STORAGE_KEYS.SAVED_LOCATIONS, ['hosp-001', 'loc-002']);
  }

  toggleSaveLocation(locationId: string): boolean {
    const current = this.getSavedLocationIds();
    const exists = current.includes(locationId);
    const updated = exists ? current.filter(id => id !== locationId) : [...current, locationId];
    this.saveToLocalStorage(STORAGE_KEYS.SAVED_LOCATIONS, updated);
    return !exists;
  }

  // --- Weather Telemetry ---
  async getWeather(): Promise<WeatherData> {
    try {
      // Live fetch using Open-Meteo free API for city coordinates
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${CITY_CENTER.lat}&longitude=${CITY_CENTER.lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`,
        { next: { revalidate: 300 } }
      );
      if (res.ok) {
        const json = await res.json();
        const current = json.current;
        const code = current?.weather_code ?? 0;
        let condition = 'Clear Sky';
        if (code > 0 && code <= 3) condition = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) condition = 'Foggy';
        else if (code >= 51 && code <= 67) condition = 'Rain Showers';
        else if (code >= 80) condition = 'Rain / Thunderstorms';

        return {
          temperature: Math.round(current.temperature_2m * 10) / 10,
          condition,
          humidity: current.relative_humidity_2m,
          windSpeed: current.wind_speed_10m,
          aqi: 48,
          aqiStatus: 'Good',
          uvIndex: 4.8,
          rainfall: current.precipitation ?? 0,
          isLive: true,
          source: 'Open-Meteo & Central Atmospheric Sensor Grid',
          lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
      }
    } catch {
      // fallback
    }
    return INITIAL_WEATHER;
  }

  // --- Global Unified Search ---
  async searchAll(query: string) {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();

    const [hospitals, edu, transport, services, locations, emergency, announcements] = await Promise.all([
      this.getHospitals(),
      this.getEducationalInstitutions(),
      this.getTransportationFacilities(),
      this.getPublicServices(),
      this.getCityLocations(),
      this.getEmergencyContacts(),
      this.getAnnouncements()
    ]);

    const results: Array<{
      id: string;
      title: string;
      category: string;
      badge: string;
      description: string;
      url: string;
    }> = [];

    hospitals.forEach(h => {
      if (
        h.name.toLowerCase().includes(q) ||
        h.services.some(s => s.toLowerCase().includes(q)) ||
        h.type.toLowerCase().includes(q)
      ) {
        results.push({
          id: h.id,
          title: h.name,
          category: 'Healthcare',
          badge: h.type.toUpperCase(),
          description: `${h.address} • Phone: ${h.phone}`,
          url: `/healthcare#${h.id}`
        });
      }
    });

    edu.forEach(e => {
      if (
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.courses.some(c => c.toLowerCase().includes(q))
      ) {
        results.push({
          id: e.id,
          title: e.name,
          category: 'Education',
          badge: e.category.replace('_', ' ').toUpperCase(),
          description: `${e.address} • Affiliation: ${e.affiliation || 'Autonomous'}`,
          url: `/education#${e.id}`
        });
      }
    });

    transport.forEach(t => {
      if (
        t.name.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.routes.some(r => r.toLowerCase().includes(q))
      ) {
        results.push({
          id: t.id,
          title: t.name,
          category: 'Transportation',
          badge: t.type.replace('_', ' ').toUpperCase(),
          description: `${t.address} • Hours: ${t.operatingHours}`,
          url: `/transportation#${t.id}`
        });
      }
    });

    services.forEach(s => {
      if (
        s.title.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: s.id,
          title: s.title,
          category: 'Public Services',
          badge: s.department.replace('_', ' ').toUpperCase(),
          description: `${s.description.substring(0, 90)}... • Helpline: ${s.helplineNumber}`,
          url: `/services#${s.id}`
        });
      }
    });

    locations.forEach(l => {
      if (
        l.name.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.highlights.some(h => h.toLowerCase().includes(q))
      ) {
        results.push({
          id: l.id,
          title: l.name,
          category: 'Explore City',
          badge: l.category.replace('_', ' ').toUpperCase(),
          description: `${l.address} • Rating: ⭐ ${l.rating}`,
          url: `/explore#${l.id}`
        });
      }
    });

    emergency.forEach(em => {
      if (
        em.serviceName.toLowerCase().includes(q) ||
        em.emergencyNumber.includes(q) ||
        em.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: em.id,
          title: em.serviceName,
          category: 'Emergency SOS',
          badge: `DIAL ${em.emergencyNumber}`,
          description: `${em.description} • Coverage: ${em.coverageArea}`,
          url: `/emergency`
        });
      }
    });

    announcements.forEach(a => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: a.id,
          title: a.title,
          category: 'Announcement',
          badge: a.priority.toUpperCase(),
          description: `${a.summary.substring(0, 90)}...`,
          url: `/announcements#${a.id}`
        });
      }
    });

    return results.slice(0, 15);
  }
}

export const dataService = new DataService();
