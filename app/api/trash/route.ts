
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
        .eq('is_deleted', true)
        .order('deleted_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(notes)
}

// Optional: Endpoint to empty trash permanently
export async function DELETE(request: Request) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if we want to delete a specific note permanently or empty trash
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    let query = supabase.from('notes').delete().eq('is_deleted', true)

    if (id) {
        query = query.eq('id', id)
    }

    const { error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
