import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Enable caching with revalidation every 120 seconds
export const revalidate = 120;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id, name, image, created_at')
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    // Add cache headers
    return NextResponse.json(data || [], {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=240',
      },
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json([], { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  }
}
