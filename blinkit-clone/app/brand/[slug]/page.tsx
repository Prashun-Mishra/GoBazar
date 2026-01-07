import { Metadata } from 'next'
import BrandClient from './BrandClient'
import { BACKEND_URL } from '@/lib/api-config'

// Force rebuild
type Props = {
    params: { slug: string }
}

export async function generateStaticParams() {
    try {
        // Fetch products to extract unique brands
        const res = await fetch(`${BACKEND_URL}/api/products?limit=1000`, {
            next: { revalidate: 3600 },
        })

        if (!res.ok) return []

        const data = await res.json()
        const products = data.products || data.data || []

        // Extract unique brands
        const brands = Array.from(new Set(
            Array.isArray(products)
                ? products.map((p: any) => p.brand).filter(Boolean)
                : []
        ))

        return brands.map((brand: any) => {
            const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            return { slug }
        })
    } catch (error) {
        console.error('Error generating static params for brands:', error)
        return []
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const brandName = decodeURIComponent(params.slug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const brandUrl = `https://www.gobazaar.in/brand/${params.slug}`

    return {
        title: `${brandName} Products - Go Bazar`,
        description: `Shop for ${brandName} products online at Go Bazar. Best prices and fast delivery.`,
        alternates: {
            canonical: brandUrl,
        },
        openGraph: {
            title: `${brandName} Products - Go Bazar`,
            description: `Shop for ${brandName} products online at Go Bazar.`,
            url: brandUrl,
        },
    }
}

export default function BrandPage({ params }: Props) {
    return <BrandClient brandSlug={params.slug} />
}
