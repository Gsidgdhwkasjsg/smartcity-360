import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/services/dataService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackingId = searchParams.get('trackingId');

  try {
    if (trackingId) {
      const complaint = await dataService.getComplaintByTrackingId(trackingId);
      if (!complaint) {
        return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
      }
      return NextResponse.json(complaint);
    }

    const all = await dataService.getComplaints();
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve complaints' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.citizenName || !body.citizenPhone || !body.category || !body.title || !body.description || !body.locationAddress) {
      return NextResponse.json({ error: 'Missing mandatory complaint fields' }, { status: 400 });
    }

    const complaint = await dataService.createComplaint({
      citizenName: body.citizenName,
      citizenPhone: body.citizenPhone,
      citizenEmail: body.citizenEmail || 'citizen@smartcity360.gov.in',
      category: body.category,
      title: body.title,
      description: body.description,
      locationAddress: body.locationAddress,
      wardNumber: body.wardNumber || 'Ward 12 - Smart Central',
      lat: body.lat,
      lng: body.lng,
      imageUrl: body.imageUrl,
      priority: body.priority || 'medium'
    });

    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to lodge complaint' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id && !body.trackingId) {
      return NextResponse.json({ error: 'Missing complaint ID or tracking ID' }, { status: 400 });
    }

    const updated = await dataService.updateComplaint(body.id || body.trackingId, {
      status: body.status,
      assignedDepartment: body.assignedDepartment,
      assignedOfficer: body.assignedOfficer,
      resolutionNotes: body.resolutionNotes,
      priority: body.priority
    });

    if (!updated) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update complaint' }, { status: 500 });
  }
}
