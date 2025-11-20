import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Enable caching with revalidation every 60 seconds
export const revalidate = 60;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('id, hospital_name, contact_phone, contact_email, contact_address, working_hours')
      .limit(1)
      .single();

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
