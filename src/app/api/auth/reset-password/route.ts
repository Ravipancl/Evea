import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Input validation
    if (!email) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email is required',
          code: 'MISSING_EMAIL'
        },
        { status: 400 }
      )
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password`
    })

    if (error) {
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          code: 'PASSWORD_RESET_FAILED'
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
      data: {
        email: email
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