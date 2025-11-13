import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('Fetching treatments from Supabase...');
    
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Treatments fetched:', data?.length || 0);
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
