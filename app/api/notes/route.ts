
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_deleted', false)
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const json = await request.json()
    const { title, content, tag_id } = json

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const { data: note, error } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        title,
        content,
        tag_id: tag_id || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
