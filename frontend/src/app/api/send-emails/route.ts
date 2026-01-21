import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth/guards'

/**
 * API route to trigger the email worker
 * Accessible to any authenticated user (club admins/officers can use this)
 * Calls the Supabase Edge Function to process pending emails immediately
 */
export async function POST() {
  try {
    // Require authentication (any authenticated user can trigger)
    await requireUser()

    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const sendEmailsSecret = process.env.SEND_EMAILS_SECRET

    // Validate environment variables
    if (!supabaseUrl) {
      console.error('NEXT_PUBLIC_SUPABASE_URL is not set')
      return NextResponse.json(
        { error: 'Server configuration error: NEXT_PUBLIC_SUPABASE_URL not set' },
        { status: 500 }
      )
    }

    if (!supabaseAnonKey) {
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error: NEXT_PUBLIC_SUPABASE_ANON_KEY not set' },
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
    
    console.log('Calling Edge Function:', edgeFunctionUrl)
    
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
        { 
          error: 'Failed to connect to email service',
          details: fetchError instanceof Error ? fetchError.message : String(fetchError)
        },
        { status: 500 }
      )
    }

    if (!response || !response.ok) {
      let errorData: any = {}
      let errorText: string = ''
      try {
        errorText = await response.text()
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: errorText || 'Unknown error', status: response?.status }
      }
      console.error('Edge Function error:', {
        status: response?.status,
        statusText: response?.statusText,
        error: errorData
      })
      return NextResponse.json(
        { 
          error: errorData.error || 'Failed to trigger email worker',
          status: response?.status,
          details: errorData
        },
        { status: response?.status || 500 }
      )
    }

    let data: any = {}
    try {
      const text = await response.text()
      data = text ? JSON.parse(text) : { success: true, message: 'Email worker triggered' }
    } catch (parseError) {
      console.error('Failed to parse response:', parseError)
      data = { success: true, message: 'Email worker triggered (response parse failed)' }
    }

    console.log('Email worker response:', data)

    return NextResponse.json({
      success: true,
      message: 'Email worker triggered',
      result: data,
    })
  } catch (error) {
    // requireUser throws redirects, which we need to let through
    if (error instanceof Response) {
      throw error
    }

    console.error('Error triggering email worker:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : String(error)
      },
      { status: 500 }
    )
  }
}
