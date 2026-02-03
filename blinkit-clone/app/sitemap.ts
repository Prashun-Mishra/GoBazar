import { MetadataRoute } from 'next'

// Hardcode backend URL for sitemap to avoid any env var issues during build
const SITEMAP_BACKEND_URL = 'https://gobazar-backend.onrender.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.gobazaar.in'

    // Static routes
    const routes = [
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

    // Fetch categories with robust error handling
    try {
        const categoriesRes = await fetch(`${SITEMAP_BACKEND_URL}/api/categories`, {
            cache: 'no-store',
            next: { revalidate: 0 },
        })

        if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json()
            const categories = categoriesData.data || categoriesData || []

            categoryRoutes = Array.isArray(categories) ? categories.map((category: any) => ({
                url: `${baseUrl}/category/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            })) : []

            console.log(`[Sitemap] Loaded ${categoryRoutes.length} category URLs`)
        }
    } catch (error) {
        console.error('[Sitemap] Error fetching categories:', error)
    }

    // Fetch products with robust error handling
    try {
        const productsRes = await fetch(`${SITEMAP_BACKEND_URL}/api/products?limit=1000`, {
            cache: 'no-store',
            next: { revalidate: 0 },
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

            // Extract unique brands from products
            const brands = Array.from(new Set(
                Array.isArray(products)
                    ? products.map((p: any) => p.brand).filter(Boolean)
                    : []
            ))

            brandRoutes = brands.map((brand: any) => {
                const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                return {
                    url: `${baseUrl}/brand/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }
            })

            console.log(`[Sitemap] Loaded ${productRoutes.length} product URLs and ${brandRoutes.length} brand URLs`)
        }
    } catch (error) {
        console.error('[Sitemap] Error fetching products:', error)
    }

    const allRoutes = [...routes, ...categoryRoutes, ...brandRoutes, ...productRoutes]
    console.log(`[Sitemap] Total URLs: ${allRoutes.length}`)

    return allRoutes
}
