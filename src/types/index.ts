export type EntityCategory =
  | 'hospital'
  | 'education'
  | 'transport'
  | 'service'
  | 'emergency'
  | 'location'
  | 'announcement';

export interface Hospital {
  id: string;
  name: string;
  type: 'government' | 'private' | 'clinic' | 'diagnostic' | 'pharmacy';
  address: string;
  lat: number;
  lng: number;
  phone: string;
  emergencyHotline?: string;
  operatingHours: string;
  services: string[];
  bedCapacity: number;
  icuBeds: number;
  hasAmbulance: boolean;
  verified: boolean;
  website?: string;
  imageUrl?: string;
}

export interface EducationalInstitution {
  id: string;
  name: string;
  category: 'school' | 'college' | 'university' | 'technical_institute' | 'library' | 'skill_center';
  location: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  email?: string;
  website?: string;
  courses: string[];
  studentCapacity: number;
  establishedYear: number;
  affiliation?: string;
  imageUrl?: string;
}

export interface TransportationFacility {
  id: string;
  name: string;
  type: 'bus_terminal' | 'metro_station' | 'railway_junction' | 'airport' | 'parking' | 'ev_charging' | 'auto_taxi_stand';
  address: string;
  lat: number;
  lng: number;
  routes: string[];
  operatingHours: string;
  fareInfo: string;
  facilities: string[];
  status: 'active' | 'congested' | 'maintenance';
  contactNumber?: string;
  capacity?: string;
}

export interface PublicService {
  id: string;
  title: string;
  department:
    | 'water_supply'
    | 'electricity'
    | 'waste_management'
    | 'sanitation'
    | 'property_tax'
    | 'civil_certificates'
    | 'municipal_licensing'
    | 'road_maintenance'
    | 'streetlights';
  description: string;
  onlinePortalUrl?: string;
  helplineNumber: string;
  officeHours: string;
  estimatedDays: number;
  feeDetails: string;
  isOnlineEnabled: boolean;
  requirements?: string[];
}

export type ComplaintCategory =
  | 'roads_potholes'
  | 'streetlights'
  | 'water_leakage'
  | 'garbage_sanitation'
  | 'sewerage'
  | 'noise_pollution'
  | 'traffic_parking'
  | 'public_property'
  | 'other';

export type ComplaintStatus =
  | 'submitted'
  | 'under_review'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Complaint {
  id: string;
  trackingId: string;
  userId?: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  locationAddress: string;
  wardNumber: string;
  lat?: number;
  lng?: number;
  imageUrl?: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  assignedDepartment?: string;
  assignedOfficer?: string;
  resolutionNotes?: string;
  resolutionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  id: string;
  serviceName: string;
  category:
    | 'police'
    | 'fire'
    | 'ambulance'
    | 'disaster_management'
    | 'women_safety'
    | 'child_helpline'
    | 'cyber_crime'
    | 'traffic_control'
    | 'gas_leak';
  emergencyNumber: string;
  tollFreeNumber?: string;
  alternateNumber?: string;
  coverageArea: string;
  description: string;
  address?: string;
  lat?: number;
  lng?: number;
  priorityOrder: number;
}

export interface CityLocation {
  id: string;
  name: string;
  category:
    | 'tourist_attraction'
    | 'historical_heritage'
    | 'shopping_center'
    | 'park_recreation'
    | 'cultural_center'
    | 'government_building';
  description: string;
  imageUrl: string;
  address: string;
  lat: number;
  lng: number;
  openingHours: string;
  entryFee: string;
  contactInfo?: string;
  highlights: string[];
  rating: number;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category:
    | 'emergency_alert'
    | 'public_notice'
    | 'traffic_update'
    | 'infrastructure'
    | 'water_shutdown'
    | 'power_maintenance'
    | 'civic_events';
  priority: 'critical' | 'high' | 'normal' | 'info';
  publishedBy: string;
  effectiveFrom: string;
  effectiveUntil?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CityStatistic {
  key: string;
  category: 'demographics' | 'transport' | 'healthcare' | 'education' | 'environment' | 'public_services' | 'energy';
  title: string;
  value: number;
  displayValue: string;
  unit?: string;
  changeRate: number;
  trend: 'up' | 'down' | 'neutral';
  isLive: boolean;
  verifiedSource: string;
  lastUpdated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'citizen' | 'admin';
  ward?: string;
  address?: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    emergencyBroadcasts: boolean;
    utilityAlerts: boolean;
  };
  savedLocations: string[];
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
  aqiStatus: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  uvIndex: number;
  rainfall: number;
  isLive: boolean;
  source: string;
  lastUpdated: string;
}
