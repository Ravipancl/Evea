import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, phone, password, userData } = await request.json()

    // Input validation
    if (!email && !phone) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email or phone is required',
          code: 'MISSING_IDENTIFIER'
        },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Password is required',
          code: 'MISSING_PASSWORD'
        },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Password must be at least 6 characters',
          code: 'WEAK_PASSWORD'
        },
        { status: 400 }
      )
    }

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    // Phone validation (basic)
    if (phone && !/^\+?[\d\s\-\(\)]+$/.test(phone)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid phone format',
          code: 'INVALID_PHONE'
        },
        { status: 400 }
      )
    }

    // Register user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email || undefined,
      phone: phone || undefined,
      password,
      options: {
        data: userData || {},
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`
      }
    })

    if (error) {
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          code: 'REGISTRATION_FAILED'
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          phone: data.user?.phone,
          created_at: data.user?.created_at,
          email_confirmed_at: data.user?.email_confirmed_at,
          phone_confirmed_at: data.user?.phone_confirmed_at
        },
        session: data.session,
        requiresVerification: !data.session
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