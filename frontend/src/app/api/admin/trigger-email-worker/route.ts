import { NextResponse } from 'next/server'
import { requirePlatformAdmin } from '@/lib/auth/guards'

/**
 * API route to trigger the email worker
 * Protected by platform admin authentication
 * Calls the Supabase Edge Function to process pending emails
 */
export async function POST() {
  try {
    // Require platform admin authentication
    await requirePlatformAdmin()

    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const sendEmailsSecret = process.env.SEND_EMAILS_SECRET

    // Validate environment variables
    if (!supabaseUrl) {
      console.error('NEXT_PUBLIC_SUPABASE_URL is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!supabaseAnonKey) {
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!sendEmailsSecret) {
      console.error('SEND_EMAILS_SECRET is not set')
      return NextResponse.json(
        { error: 'Server configuration error: SEND_EMAILS_SECRET not configured' },
        { status: 500 }
      )
    }

    // Call the Edge Function
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/send-emails`
    
    let response: Response
    try {
      response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'x-worker-secret': sendEmailsSecret,
          'Content-Type': 'application/json',
        },
      })
    } catch (fetchError) {
      console.error('Failed to call Edge Function:', fetchError)
      return NextResponse.json(
        { error: 'Failed to connect to email service' },
        { status: 500 }
      )
    }

    if (!response || !response.ok) {
      let errorData: any = {}
      try {
        errorData = await response.json()
      } catch {
        errorData = { error: 'Unknown error' }
      }
      console.error('Edge Function error:', errorData)
      return NextResponse.json(
        { error: errorData.error || 'Failed to trigger email worker' },
        { status: response?.status || 500 }
      )
    }

    let data: any = {}
    try {
      data = await response.json()
    } catch {
      data = { success: true, message: 'Email worker triggered' }
    }

    return NextResponse.json({
      success: true,
      message: 'Email worker triggered',
      result: data,
    })
  } catch (error) {
    // requirePlatformAdmin throws redirects, which we need to let through
    // Other errors should be caught
    if (error instanceof Response) {
      // This is a redirect from requirePlatformAdmin
      throw error
    }

    console.error('Error triggering email worker:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred' 
      },
      { status: 500 }
    )
  }
}
