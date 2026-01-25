import { Metadata } from 'next'
import { BACKEND_URL } from '@/lib/api-config'
import ProductClient from './product-client'

type Props = {
  params: { id: string }
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.data || data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    // Fetch products for static generation (limit to 500 to avoid build timeout)
    const res = await fetch(`${BACKEND_URL}/api/products?limit=500`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const data = await res.json()
    const products = data.products || data.data || []

    return Array.isArray(products)
      ? products.map((product: any) => ({
        id: product.id,
      }))
      : []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
      robots: { index: false, follow: false },
    }
  }

  const productUrl = `https://www.gobazaar.in/product/${params.id}`
  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || '0')
  const discountPercent = product.discountPercent || 0

  // Create a rich, unique description
  const priceText = price > 0 ? `₹${price}` : ''
  const discountText = discountPercent > 0 ? ` (${discountPercent}% off)` : ''
  const brandText = product.brand ? `by ${product.brand}` : ''

  const shortDesc = product.description?.slice(0, 100) || ''
  const richDescription = `Buy ${product.name} ${brandText} at ${priceText}${discountText} on Go Bazaar Pune. ${shortDesc} Fast delivery in Pune. Order online now!`.slice(0, 160)

  // Keywords for better search visibility
  const keywords = [
    product.name,
    product.brand,
    `${product.name} online`,
    `buy ${product.name}`,
    `${product.name} pune`,
    `${product.name} delivery`,
    ...(product.tags || []),
  ].filter(Boolean)

  return {
    title: `${product.name} ${brandText} - Buy Online | Go Bazaar`,
    description: richDescription,
    keywords: keywords,
    alternates: {
      canonical: productUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    openGraph: {
      type: 'website',
      title: `${product.name} - Go Bazaar`,
      description: richDescription,
      images: product.images?.[0] ? [{
        url: product.images[0],
        width: 800,
        height: 800,
        alt: product.name,
      }] : [],
      url: productUrl,
      siteName: 'Go Bazaar',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: richDescription,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id)

  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0],
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Go Bazar',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.gobazaar.in/product/${product.id}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductClient product={product} />
    </>
  )
}
