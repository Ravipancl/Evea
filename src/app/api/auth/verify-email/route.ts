import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    // Log the verification attempt
    console.log('🔍 Email Verification Attempt:')
    console.log('📧 Email:', email)
    console.log('🔑 Token:', token)
    console.log('📏 Token Length:', token?.length || 0)
    console.log('⏰ Timestamp:', new Date().toISOString())

    // Input validation
    if (!email || !token) {
      console.log('❌ Missing email or token')
      return NextResponse.json(
        { 
          success: false,
          error: 'Email and token are required',
          code: 'MISSING_VERIFICATION_DATA'
        },
        { status: 400 }
      )
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('❌ Invalid email format:', email)
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    console.log('✅ Proceeding with Supabase verification...')

    // Try to exchange the token for a session
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    })

    if (error) {
      console.log('❌ Verification failed:', error.message)
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          code: 'VERIFICATION_FAILED'
        },
        { status: 400 }
      )
    }

    console.log('✅ Email verified successfully!')
    console.log('👤 User ID:', data.user?.id)
    console.log('📅 Confirmed at:', data.user?.email_confirmed_at)

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          email_confirmed_at: data.user?.email_confirmed_at
        },
        session: data.session
      }
    })

  } catch (error) {
    console.log('❌ Internal error:', error)
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