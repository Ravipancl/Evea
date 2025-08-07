import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { phone, token } = await request.json()

    // Log the verification attempt
    console.log('📱 Phone Verification Attempt:')
    console.log('📞 Phone:', phone)
    console.log('🔑 Token:', token)
    console.log('📏 Token Length:', token?.length || 0)
    console.log('⏰ Timestamp:', new Date().toISOString())

    // Input validation
    if (!phone || !token) {
      console.log('❌ Missing phone or token')
      return NextResponse.json(
        { 
          success: false,
          error: 'Phone and token are required',
          code: 'MISSING_VERIFICATION_DATA'
        },
        { status: 400 }
      )
    }

    // Phone validation
    if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
      console.log('❌ Invalid phone format:', phone)
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid phone format',
          code: 'INVALID_PHONE'
        },
        { status: 400 }
      )
    }

    console.log('✅ Proceeding with Supabase phone verification...')

    // Verify phone with OTP
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })

    if (error) {
      console.log('❌ Phone verification failed:', error.message)
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          code: 'VERIFICATION_FAILED'
        },
        { status: 400 }
      )
    }

    console.log('✅ Phone verified successfully!')
    console.log('👤 User ID:', data.user?.id)
    console.log('📅 Confirmed at:', data.user?.phone_confirmed_at)

    return NextResponse.json({
      success: true,
      message: 'Phone verified successfully',
      data: {
        user: {
          id: data.user?.id,
          phone: data.user?.phone,
          phone_confirmed_at: data.user?.phone_confirmed_at
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