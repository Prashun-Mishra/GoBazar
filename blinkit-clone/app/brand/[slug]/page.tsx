import { Metadata } from 'next'
import BrandClient from './BrandClient'

// Force rebuild
type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const brandName = decodeURIComponent(params.slug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    return {
        title: `${brandName} Products - Go Bazar`,
        description: `Shop for ${brandName} products online at Go Bazar. Best prices and fast delivery.`,
        openGraph: {
            title: `${brandName} Products - Go Bazar`,
            description: `Shop for ${brandName} products online at Go Bazar.`,
        },
    }
}

export default function BrandPage({ params }: Props) {
    return <BrandClient brandSlug={params.slug} />
}
