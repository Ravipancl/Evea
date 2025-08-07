import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { redirectTo } = await request.json()

    // Generate Google OAuth URL
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`
      }
    })

    if (error) {
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          code: 'GOOGLE_OAUTH_FAILED'
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Google OAuth URL generated',
      data: {
        url: data.url,
        provider: 'google'
      }
    })

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
} 