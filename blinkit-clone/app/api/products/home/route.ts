import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/api-config"
import { fetchWithRetry } from "@/lib/fetch-retry"

export async function GET() {
    try {
        const backendUrl = `${BACKEND_URL}/api/products/home`
        console.log(`🔍 [Home API] Fetching from backend: ${backendUrl}`)



        const response = await fetchWithRetry(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 } // Cache for 60 seconds
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`❌ [Home API] Backend error ${response.status}:`, errorText)
            return NextResponse.json({ error: `Backend returned ${response.status}` }, { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching homepage products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch homepage products' },
            { status: 500 }
        )
    }
}
