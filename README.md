# SMARTCITY 360 — Smart City Digital Portal

> **"A Smarter City. A Better Tomorrow."**

**SMARTCITY 360** is a modern, unified metropolitan digital portal designed for citizens and visitors. It integrates civic public services, multi-modal transportation, healthcare availability, educational institutions, emergency response hotlines, environmental sensor telemetry, and interactive GIS mapping into one seamless, production-ready platform.

---

## 🌟 Key Features & Functional Modules

### 1. 🏙️ Metropolitan Command Homepage (`/`)
- **Brand Identity**: Futuristic, clean interface inspired by smart-city command dashboards, Google Maps, and modern SaaS portals.
- **Hero Hub**: Hero headline *"Your City, Connected. Your Future, Smarter."* with quick action CTAs.
- **Live Telemetry & Weather**: Real-time atmospheric conditions (temperature, humidity, wind, rainfall) and Air Quality Index (AQI) powered by Open-Meteo.
- **Live Date & Time**: Real-time ticking municipal clock.
- **Urgent Public Notices Ticker**: Prominent alert banner displaying high/critical notices.
- **Fast Citizen Action Tiles**: Quick shortcuts for Emergency 112, Grievance filing, Hospital finder, Metro routes, Tax payment, and Map exploration.

### 2. 📊 City Dashboard & Open Data Telemetry (`/dashboard`)
- **Administrative Counts**: Verified records for metropolitan population (2.845M), 48 hospitals, 312 schools/colleges, 185 transit terminals, 45 digital services, and 86 recreational parks.
- **Interactive Visualizations (Recharts)**:
  - 24-Hour Continuous Air Quality Index (AQI) & PM2.5 particulate curve.
  - Renewable Solar Energy Generation vs. Conventional Grid mix.
  - Multi-modal public transit daily commuter modal share.
  - Citizen Grievance SLA resolution compliance rates (96.6% on-time resolution).
- **Ward-Wise Infrastructure Matrix**: Sector breakdown of water coverage, LED lighting, and resolution times.

### 3. 🚆 Multi-Modal Transportation Network (`/transportation`)
- **Coverage**: Public buses (ISBT terminals), Metro Rail (Line 1 Blue), Railway Junctions, International Airport, EV Supercharging Hubs, and Smart Multi-Level Parking.
- **Search & Filters**: Instant search by line name, stop, or mode.
- **Interactive Transit Map**: Geospatial routing with custom markers and Google Maps driving directions.
- **Journey Planner & Fare Estimator**: Interactive calculator computing travel time and fares across Metro, Electric Bus, and Prepaid Taxi.

### 4. 🏥 Healthcare, Hospitals & Emergency Care (`/healthcare`)
- **Directory**: Apex Government Trauma Centers (AIIMS, GGH), Super-Specialty Hospitals (Apollo, Manipal), Urban Wellness Clinics, Diagnostic Labs, and 24/7 Pharmacies.
- **Detailed Metrics**: Bed capacity, ICU bed counters, ambulance availability, emergency hotlines, operating hours, and medical specialties.
- **Filters**: Filter by facility category and medical specialty.
- **Emergency Ambulance Callout**: One-tap dialing for 108 Ambulance and 112 National SOS.

### 5. 🎓 Education, Universities & Research (`/education`)
- **Campus Directory**: Premier universities (SRM-AP, VIT-AP), technical design institutes (NID), CBSE K-12 STEM schools, smart public libraries, and youth IT skill academies.
- **Card Profiles**: Affiliations, established year, student capacity, courses offered, admissions contact, and directions.

### 6. 🏛️ Public Services Portal (`/services`)
- **Municipal Departments**: 24/7 Water Supply & ultrasonic metering, Electricity & Solar net-metering, Solid waste & e-waste scheduling, Property tax assessment & receipts, Civil birth & death registration, and Road/Streetlight repair.
- **Transparent Service Charters**: Official SLAs (turnaround days), fee structures, document checklists, and direct online e-governance links.

### 7. 📝 Citizen Grievance Redressal & Tracking (`/complaints`)
- **Grievance Lodging Form**:
  - Name, phone, email, category (potholes, streetlights, water leak, garbage, sewerage).
  - Ward selection, detailed description, exact location landmarks.
  - Photo attachment URL simulation.
  - Urgency level (Low, Medium, High, Urgent).
  - Automatically generates unique tracking ID (e.g., `SC360-2024-8921`) with confetti celebration!
- **Interactive 5-Step Lifecycle Tracker**:
  - Visual stage tracker: *Ticket Lodged ➔ Under Review ➔ Assigned to Department ➔ Work In Progress ➔ Resolved & Verified*.
  - Displays assigned engineer, department, field notes, and resolution date.
  - Pre-seeded test tickets to immediately verify tracking functionality.

### 8. 🚨 24/7 Emergency Directory & Safety Protocols (`/emergency`)
- **Verified Official Hotlines**:
  - **112**: All Emergencies (Single National Number)
  - **100**: Police Control Room
  - **101**: Fire & Rescue Services
  - **108 / 102**: Ambulance & Maternal Care
  - **1077**: Disaster Management & Flood Control
  - **1091 / 181**: Women Safety Helpline
  - **1930**: National Cyber Crime Fraud Freeze
  - **1906**: Natural Gas (PNG/LPG) Leakage
- **One-Tap Calling**: Direct `tel:` links on mobile and supported devices.
- **First Responder Geospatial Map**: Red marker pins locating trauma centers, fire headquarters, and police commissionerates.
- **Public Safety Guidelines**: Detailed walkthroughs for Adult CPR, Fire Evacuation, Earthquake Safety, and Gas Leaks.

### 9. 🗺️ Interactive City GIS Map (`/map`)
- Powered by **Leaflet** and **OpenStreetMap**.
- Color-coded custom SVG marker pins:
  - Red: Hospitals & Trauma Centers
  - Blue: Schools & Universities
  - Cyan: Metro & Transit Terminals
  - Amber: Attractions & Cultural Heritage
  - Crimson: Emergency First Responders
- Search within map, category layer toggles, location inspector cards, geolocation ("Locate Me"), center reset, and Google Maps directions integration.

### 10. 🏛️ Explore City & Heritage (`/explore`)
- Attractions, historical stupas (Amaravati Mahachaitya), riverfront promenades (Prakasam Barrage), Bhavani Island, botanical parks, and shopping malls.
- High-res photography, star ratings, entry ticket fees, visiting hours, highlights, and bookmarking.

### 11. 🍃 Environmental & Smart Infrastructure Dashboard (`/environment`)
- Hyperlocal sensor telemetry: PM2.5, PM10, NO2, SO2, CO, and Ozone.
- Water Quality Index (pH, turbidity, dissolved oxygen).
- Clean solar energy grid output (24.8 MW daily) and carbon offsets.
- IoT ultrasonic waste compactor bin fill levels and connected LED smart lighting.

### 12. 📰 Announcements & Civic News (`/announcements`)
- Filter by priority (Critical, High, Normal, Info) and category.
- Copyable shareable links and official verification badges.

### 13. 👤 Citizen Account & Dashboard (`/account`)
- Citizen profile management (name, email, phone, ward, address).
- Instant demo login toggle (test immediately without external setup).
- History of all grievances lodged by the citizen with live tracking shortcuts.
- Bookmarked saved city locations with one-click map routing.
- Notification preferences (emergency broadcasts, utility maintenance, email/SMS).

### 14. 🛡️ Municipal Admin Command Console (`/admin`)
- Protected admin operations dashboard.
- Live queue of citizen complaints with **Update Status modal**:
  - Reassign municipal department and officer in charge.
  - Advance lifecycle status (*Under Review*, *Assigned*, *In Progress*, *Resolved*).
  - Add official field notes and resolution timestamps.
- **Announcement Publisher**: Form to broadcast city alerts live onto the site banner.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with modern Glassmorphism & custom cyan/navy theme
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) (Responsive Area, Bar, Line, and Pie charts)
- **Mapping**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/) with OpenStreetMap
- **Visual FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend / Storage**:
  - [Supabase](https://supabase.com/) & PostgreSQL client support
  - Auto-fallback universal data service with persistent client-side storage
  - Next.js Edge-ready REST API Routes (`/api/complaints`, `/api/weather`, `/api/search`, `/api/stats`)
- **Hosting & Deployment**: [Vercel](https://vercel.com/)
- **Version Control**: [GitHub](https://github.com/Gsidgdhwkasjsg/smartcity-360)

---

## 🗄️ Database Architecture & Schema

The project includes a production-grade PostgreSQL schema (`schema.sql`) configured with Row Level Security (RLS) policies:

- `profiles`: Citizen accounts, roles (`citizen`, `city_admin`), ward info, and notification preferences.
- `city_statistics`: Urban telemetry metrics with verified sources and trend analysis.
- `hospitals`: Medical facilities, bed capacities, ICU counters, ambulance status, and coordinates.
- `educational_institutions`: Universities, colleges, schools, libraries, and courses.
- `transportation_facilities`: Multi-modal terminals, routes, operating hours, and fare info.
- `public_services`: Departmental portals, requirements checklists, turnaround SLAs, and fee schedules.
- `complaints`: Citizen grievances, tracking IDs, location coordinates, photos, officer assignments, and resolution notes.
- `emergency_contacts`: Verified hotlines with CAD priority order.
- `city_locations`: Heritage sites, tourist attractions, ratings, entry fees, and hours.
- `announcements`: Public bulletins with priority tags (`critical`, `high`, `normal`, `info`).
- `saved_locations`: Citizen bookmarks.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js 18.x or 20.x+
- npm or pnpm

### 2. Clone and Install
```bash
git clone https://github.com/Gsidgdhwkasjsg/smartcity-360.git
cd smartcity-360
npm install
```

### 3. Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CITY_NAME=Amaravati Metropolitan Region
NEXT_PUBLIC_CITY_LAT=16.5131
NEXT_PUBLIC_CITY_LNG=80.5168
NEXT_PUBLIC_WEATHER_API_PROVIDER=open-meteo

# Optional: Supabase Connection (Portal operates with full persistence out-of-the-box if omitted)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🌐 Public Deployment (Vercel)

The application is deployed publicly on Vercel:
- **Repository**: [https://github.com/Gsidgdhwkasjsg/smartcity-360](https://github.com/Gsidgdhwkasjsg/smartcity-360)
- **Live Production Website**: [https://smartcity-360-ochre.vercel.app](https://smartcity-360-ochre.vercel.app) (or your configured Vercel URL)

---

## 📜 Civic Verification & Transparency Policy

SMARTCITY 360 is built on strict data integrity principles:
1. **Verified Official Information**: Demographics, emergency numbers (112, 108, 101, 100), and hospital addresses are verified from municipal authorities.
2. **Live Sensor Feeds**: Weather and atmospheric parameters are queried live from open meteorological APIs.
3. **Simulated Demonstrative Fields**: Where simulated real-time data is presented (e.g. sample grievance tickets or demonstration parking bays), it is explicitly labeled to prevent misinformation.

---

*SMARTCITY 360 — A Smarter City. A Better Tomorrow.*
