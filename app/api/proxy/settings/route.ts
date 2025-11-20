import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Enable caching with revalidation every 60 seconds
export const revalidate = 60;

export async function GET() {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const { data, error } = await supabase
      .from('settings')
      .select('id, hospital_name, contact_phone, contact_email, contact_address, working_hours')
      .limit(1)
      .single()
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (error) throw error;
    
    // Add cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(null, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  }
}
