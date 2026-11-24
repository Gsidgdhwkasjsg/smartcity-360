import { NextResponse } from 'next/server';
import { dataService } from '@/services/dataService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const weather = await dataService.getWeather();
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
