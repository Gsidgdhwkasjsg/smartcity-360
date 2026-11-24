import { NextResponse } from 'next/server';
import { dataService } from '@/services/dataService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await dataService.getStatistics();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve stats' }, { status: 500 });
  }
}
