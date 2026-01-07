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
    }
  }

  const productUrl = `https://www.gobazaar.in/product/${params.id}`

  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `Buy ${product.name} at best prices on Go Bazar.`,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0] ? [product.images[0]] : [],
      url: productUrl,
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
