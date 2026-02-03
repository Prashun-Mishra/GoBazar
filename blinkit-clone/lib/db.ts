import { neon } from '@neondatabase/serverless'

// Create neon database client
// Uses DATABASE_URL from environment variables
export function getDB() {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
        console.error('[DB] DATABASE_URL not found')
        return null
    }

    return neon(databaseUrl)
}
