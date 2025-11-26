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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `Buy ${product.name} at best prices on Go Bazar.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id)
  return <ProductClient product={product} />
}
