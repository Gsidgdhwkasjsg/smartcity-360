import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/services/dataService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  try {
    const results = await dataService.searchAll(q);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
