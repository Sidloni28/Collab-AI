import { NextResponse } from 'next/server'

/**
 * Health Check API 💓
 * This endpoint is used by Docker and monitoring tools 
 * to verify that the application is up and running.
 */
export async function GET() {
  try {
    // Basic status check
    // In a more complex solution, you might also ping the database here
    return NextResponse.json(
      { 
        status: 'UP', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        service: 'collab-ai'
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { status: 'DOWN', error: 'Service Unavailable' },
      { status: 503 }
    )
  }
}
