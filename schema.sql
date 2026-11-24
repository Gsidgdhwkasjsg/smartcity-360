-- ==============================================================================
-- SMARTCITY 360 — Smart City Digital Portal Database Schema
-- Compatible with Supabase & PostgreSQL 14+
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CITIZEN PROFILES & ROLES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'city_admin', 'service_agent')),
  ward_number TEXT DEFAULT 'Ward 12 - Smart Central',
  address TEXT,
  notification_preferences JSONB DEFAULT '{"email": true, "sms": false, "emergency_broadcasts": true, "utility_alerts": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CITY STATISTICS & TELEMETRY
CREATE TABLE IF NOT EXISTS city_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_key TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('demographics', 'transport', 'healthcare', 'education', 'environment', 'public_services', 'energy')),
  title TEXT NOT NULL,
  value NUMERIC NOT NULL,
  display_value TEXT NOT NULL,
  unit TEXT,
  change_rate NUMERIC DEFAULT 0,
  trend TEXT DEFAULT 'neutral' CHECK (trend IN ('up', 'down', 'neutral')),
  is_live BOOLEAN DEFAULT false,
  verified_source TEXT NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HEALTHCARE & HOSPITALS
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('government', 'private', 'clinic', 'diagnostic', 'pharmacy')),
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  phone TEXT NOT NULL,
  emergency_hotline TEXT,
  operating_hours TEXT NOT NULL DEFAULT '24/7 Emergency',
  services TEXT[] NOT NULL DEFAULT ARRAY['Emergency Care', 'OPD', 'Diagnostics'],
  bed_capacity INTEGER DEFAULT 150,
  icu_beds INTEGER DEFAULT 20,
  has_ambulance_service BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT true,
  website TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EDUCATIONAL INSTITUTIONS
CREATE TABLE IF NOT EXISTS educational_institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('school', 'college', 'university', 'technical_institute', 'library', 'skill_center')),
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  website TEXT,
  courses_offered TEXT[] DEFAULT ARRAY['General Curriculum'],
  student_capacity INTEGER DEFAULT 1000,
  established_year INTEGER,
  affiliation TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TRANSPORTATION FACILITIES & HUBS
CREATE TABLE IF NOT EXISTS transportation_facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bus_terminal', 'metro_station', 'railway_junction', 'airport', 'parking', 'ev_charging', 'auto_taxi_stand')),
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  routes_served TEXT[] DEFAULT ARRAY[]::TEXT[],
  operating_hours TEXT DEFAULT '05:00 AM - 11:30 PM',
  fare_info TEXT,
  facilities TEXT[] DEFAULT ARRAY['Ticket Counter', 'Restrooms', 'Wheelchair Access'],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'congested', 'maintenance')),
  contact_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PUBLIC SERVICES & UTILITIES
CREATE TABLE IF NOT EXISTS public_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL CHECK (department IN ('water_supply', 'electricity', 'waste_management', 'sanitation', 'property_tax', 'civil_certificates', 'municipal_licensing', 'road_maintenance', 'streetlights')),
  description TEXT NOT NULL,
  online_portal_url TEXT,
  helpline_number TEXT NOT NULL,
  office_hours TEXT DEFAULT '09:00 AM - 05:30 PM (Mon-Fri)',
  estimated_processing_days INTEGER DEFAULT 3,
  fee_details TEXT DEFAULT 'Nil / Standard Municipal Tariff',
  is_online_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CITIZEN COMPLAINTS & GRIEVANCES
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  citizen_name TEXT NOT NULL,
  citizen_phone TEXT NOT NULL,
  citizen_email TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('roads_potholes', 'streetlights', 'water_leakage', 'garbage_sanitation', 'sewerage', 'noise_pollution', 'traffic_parking', 'public_property', 'other')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location_address TEXT NOT NULL,
  ward_number TEXT NOT NULL,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  image_url TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'rejected')),
  assigned_department TEXT,
  assigned_officer TEXT,
  resolution_notes TEXT,
  resolution_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EMERGENCY CONTACTS & FIRST RESPONDERS
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('police', 'fire', 'ambulance', 'disaster_management', 'women_safety', 'child_helpline', 'cyber_crime', 'traffic_control', 'gas_leak')),
  emergency_number TEXT NOT NULL,
  toll_free_number TEXT,
  alternate_number TEXT,
  coverage_area TEXT DEFAULT 'All Metropolitan Zones',
  description TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  priority_order INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. IMPORTANT CITY LOCATIONS & ATTRACTIONS
CREATE TABLE IF NOT EXISTS city_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tourist_attraction', 'historical_heritage', 'shopping_center', 'park_recreation', 'cultural_center', 'government_building')),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  opening_hours TEXT NOT NULL,
  entry_fee TEXT DEFAULT 'Free',
  contact_info TEXT,
  highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
  rating NUMERIC(2,1) DEFAULT 4.6,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CITY ANNOUNCEMENTS & ALERTS
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('emergency_alert', 'public_notice', 'traffic_update', 'infrastructure', 'water_shutdown', 'power_maintenance', 'civic_events')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('critical', 'high', 'normal', 'info')),
  published_by TEXT NOT NULL DEFAULT 'City Information Bureau',
  effective_from TIMESTAMPTZ DEFAULT NOW(),
  effective_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. USER SAVED LOCATIONS & BOOKMARKS
CREATE TABLE IF NOT EXISTS saved_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location_id UUID NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('hospital', 'education', 'transport', 'explore', 'emergency')),
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, location_id, location_type)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE educational_institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transportation_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_locations ENABLE ROW LEVEL SECURITY;

-- Public READ for general city data
CREATE POLICY "Public can view city statistics" ON city_statistics FOR SELECT USING (true);
CREATE POLICY "Public can view hospitals" ON hospitals FOR SELECT USING (true);
CREATE POLICY "Public can view education" ON educational_institutions FOR SELECT USING (true);
CREATE POLICY "Public can view transportation" ON transportation_facilities FOR SELECT USING (true);
CREATE POLICY "Public can view public services" ON public_services FOR SELECT USING (true);
CREATE POLICY "Public can view emergency contacts" ON emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Public can view city locations" ON city_locations FOR SELECT USING (true);
CREATE POLICY "Public can view announcements" ON announcements FOR SELECT USING (is_active = true);

-- Complaints Policies
CREATE POLICY "Anyone can submit complaints" ON complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can track complaints by tracking_id" ON complaints FOR SELECT USING (true);
CREATE POLICY "Citizens can manage their own complaints" ON complaints FOR UPDATE USING (auth.uid() = user_id);

-- User Profiles & Saved Locations
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can manage saved locations" ON saved_locations FOR ALL USING (auth.uid() = user_id);

-- Indexes for high-speed queries
CREATE INDEX IF NOT EXISTS idx_hospitals_type ON hospitals(type);
CREATE INDEX IF NOT EXISTS idx_edu_category ON educational_institutions(category);
CREATE INDEX IF NOT EXISTS idx_transport_type ON transportation_facilities(type);
CREATE INDEX IF NOT EXISTS idx_complaints_tracking ON complaints(tracking_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, priority);
CREATE INDEX IF NOT EXISTS idx_city_locations_cat ON city_locations(category);
