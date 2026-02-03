import { MetadataRoute } from 'next'
import { getDB } from '@/lib/db'

// Force dynamic generation and use Node.js runtime (required for Neon)
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

// Fallback to API if DB fails
const SITEMAP_BACKEND_URL = 'https://gobazar-backend.onrender.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.gobazaar.in'

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/terms',
        '/privacy',
        '/shipping',
        '/returns',
        '/faq',
        '/healthy-eating-tips',
        '/food-safety-standards',
        '/payment-policy',
        '/security',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    let categoryRoutes: MetadataRoute.Sitemap = []
    let productRoutes: MetadataRoute.Sitemap = []
    let brandRoutes: MetadataRoute.Sitemap = []

    // Try direct DB access first
    const sql = getDB()

    if (sql) {
        try {
            // Fetch categories directly from Neon
            const categories = await sql`
                SELECT slug, updated_at FROM categories WHERE is_active = true
            `

            categoryRoutes = categories.map((cat: any) => ({
                url: `${baseUrl}/category/${cat.slug}`,
                lastModified: new Date(cat.updated_at || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            }))

            // Fetch products directly from Neon
            const products = await sql`
                SELECT id, brand, updated_at FROM products WHERE is_active = true
            `

            productRoutes = products.map((product: any) => ({
                url: `${baseUrl}/product/${product.id}`,
                lastModified: new Date(product.updated_at || new Date()),
                changeFrequency: 'daily' as const,
                priority: 0.7,
            }))

            // Extract unique brands
            const brandSet = new Set<string>()
            products.forEach((p: any) => {
                if (p.brand) brandSet.add(p.brand)
            })

            brandRoutes = Array.from(brandSet).map((brand) => {
                const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                return {
                    url: `${baseUrl}/brand/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }
            })

            console.log(`[Sitemap DB] Categories: ${categoryRoutes.length}, Products: ${productRoutes.length}, Brands: ${brandRoutes.length}`)
        } catch (error) {
            console.error('[Sitemap] DB error, falling back to API:', error)
        }
    }

    // Fallback to API if DB failed
    if (productRoutes.length === 0) {
        console.log('[Sitemap] Using API fallback')
        try {
            // Fetch categories from API
            const categoriesRes = await fetch(`${SITEMAP_BACKEND_URL}/api/categories`, {
                cache: 'no-store',
            })
            if (categoriesRes.ok) {
                const categoriesData = await categoriesRes.json()
                const categories = categoriesData.data || categoriesData || []
                categoryRoutes = Array.isArray(categories) ? categories.map((cat: any) => ({
                    url: `${baseUrl}/category/${cat.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.9,
                })) : []
            }

            // Fetch products from API
            const productsRes = await fetch(`${SITEMAP_BACKEND_URL}/api/products?limit=1000`, {
                cache: 'no-store',
            })
            if (productsRes.ok) {
                const productsData = await productsRes.json()
                const products = productsData.data || productsData.products || []

                productRoutes = Array.isArray(products) ? products.map((product: any) => ({
                    url: `${baseUrl}/product/${product.id}`,
                    lastModified: new Date(product.updatedAt || new Date()),
                    changeFrequency: 'daily' as const,
                    priority: 0.7,
                })) : []

                // Extract brands
                const brands = Array.from(new Set(
                    Array.isArray(products) ? products.map((p: any) => p.brand).filter(Boolean) : []
                ))
                brandRoutes = brands.map((brand: any) => ({
                    url: `${baseUrl}/brand/${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }))
            }

            console.log(`[Sitemap API] Categories: ${categoryRoutes.length}, Products: ${productRoutes.length}, Brands: ${brandRoutes.length}`)
        } catch (error) {
            console.error('[Sitemap] API fallback also failed:', error)
        }
    }

    const allRoutes = [...staticRoutes, ...categoryRoutes, ...brandRoutes, ...productRoutes]
    console.log(`[Sitemap] Total URLs: ${allRoutes.length}`)

    return allRoutes
}
