import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementTicker from '@/components/AnnouncementTicker';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a'
};

export const metadata: Metadata = {
  title: 'SMARTCITY 360 — Smart City Digital Portal | A Smarter City. A Better Tomorrow.',
  description:
    'Unified digital portal for metropolitan citizens and visitors. Access city public services, hospitals, live transit schedules, schools, emergency contacts, environmental indicators, and interactive GIS maps.',
  keywords: [
    'Smart City',
    'SMARTCITY 360',
    'City Portal',
    'Municipal Services',
    'Emergency 112',
    'City Hospitals',
    'Metro Bus Routes',
    'Citizen Grievance Complaint',
    'Air Quality Index AQI',
    'Interactive City Map'
  ],
  authors: [{ name: 'SMARTCITY 360 Municipal Digital Mission' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-cyan-500 selection:text-white">
        <AnnouncementTicker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
