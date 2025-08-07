import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, phone, password } = await request.json()

    // Input validation
    if ((!email && !phone) || !password) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email/phone and password are required',
          code: 'MISSING_CREDENTIALS'
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

    // Sign in user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email || undefined,
      phone: phone || undefined,
      password
    })

    if (error) {
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          code: 'LOGIN_FAILED'
        },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          phone: data.user?.phone,
          created_at: data.user?.created_at,
          email_confirmed_at: data.user?.email_confirmed_at,
          phone_confirmed_at: data.user?.phone_confirmed_at,
          user_metadata: data.user?.user_metadata
        },
        session: {
          access_token: data.session?.access_token,
          refresh_token: data.session?.refresh_token,
          expires_at: data.session?.expires_at
        }
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