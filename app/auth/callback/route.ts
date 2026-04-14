import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const role = searchParams.get('role') || 'creator'

  if (!code) {
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL('/auth/error', request.url))
    }

    let isNewUser = false
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { user } = session
      const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
      
      const { data: profile } = await supabase.from('profiles').select('id, role, company, niche').eq('id', user.id).single()
      
      if (!profile) {
        // First login via Google: create shell profile and flag as new
        isNewUser = true
        await supabase.from('profiles').insert({ id: user.id, email: user.email, name, role })
      } else if (profile.role !== role) {
        // Update role if requested role via signup doesn't match
        await supabase.from('profiles').update({ role }).eq('id', user.id)
      }

      // If missing critical info (niche for both roles), treat as new user for onboarding
      if (profile && !profile.niche) {
        isNewUser = true
      }
    }

    // Redirect to complete profile if new, otherwise to dashboard
    if (isNewUser) {
      return NextResponse.redirect(new URL(`/complete-profile?role=${role}`, request.url))
    }
    
    const dashboardUrl = role === 'brand' ? '/dashboard/brand' : '/dashboard/creator'
    return NextResponse.redirect(new URL(dashboardUrl, request.url))
  } catch (error) {
    console.error('[v0] Auth callback error:', error)
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }
}
