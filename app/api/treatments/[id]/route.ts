import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    const { data, error } = await supabase
      .from('Treatment')
      .update({
        name: body.name,
        description: body.description,
        price: body.price,
        duration: body.duration,
        icon: body.icon,
        category: body.category,
        isActive: body.isActive,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update treatment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    const { error } = await supabase
      .from('Treatment')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete treatment' },
      { status: 500 }
    );
  }
}
