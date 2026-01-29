import { MetadataRoute } from 'next'
import { BACKEND_URL } from '@/lib/api-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gobazaar.in'

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

    try {
        // Fetch categories
        const categoriesRes = await fetch(`${BACKEND_URL}/api/categories`)
        const categoriesData = await categoriesRes.json()
        const categories = categoriesData.data || categoriesData || []

        const categoryRoutes = Array.isArray(categories) ? categories.map((category: any) => ({
            url: `${baseUrl}/category/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        })) : []

        // Fetch products (limit to most recent 1000 for sitemap to avoid timeout)
        const productsRes = await fetch(`${BACKEND_URL}/api/products?limit=1000`)
        const productsData = await productsRes.json()
        const products = productsData.products || productsData.data || []

        const productRoutes = Array.isArray(products) ? products.map((product: any) => ({
            url: `${baseUrl}/product/${product.id}`,
            lastModified: new Date(product.updatedAt || new Date()),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        })) : []

        // Extract unique brands
        const brands = Array.from(new Set(
            Array.isArray(products)
                ? products.map((p: any) => p.brand).filter(Boolean)
                : []
        ))

        const brandRoutes = brands.map((brand: any) => {
            const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            return {
                url: `${baseUrl}/brand/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }
        })

        return [...routes, ...categoryRoutes, ...brandRoutes, ...productRoutes]
    } catch (error) {
        console.error('Error generating sitemap:', error)
        return routes
    }
}
