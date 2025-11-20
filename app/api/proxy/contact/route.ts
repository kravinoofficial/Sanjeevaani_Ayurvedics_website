import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const body = await request.json();
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message,
          read: false
        }
      ])
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting contact:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
