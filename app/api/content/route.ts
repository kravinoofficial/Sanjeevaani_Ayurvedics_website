import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('WebsiteContent')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('WebsiteContent')
      .update({
        heroTitle: body.heroTitle,
        heroSubtitle: body.heroSubtitle,
        heroTagline: body.heroTagline,
        aboutText: body.aboutText,
        missionText: body.missionText,
        visionText: body.visionText,
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail,
        contactAddress: body.contactAddress,
        workingHours: body.workingHours,
      })
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
