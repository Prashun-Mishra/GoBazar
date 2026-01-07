import { Metadata } from 'next'
import { BACKEND_URL } from '@/lib/api-config'
import CategoryClient from './category-client'
import { Category } from '@/types'

type Props = {
  params: { slug: string }
}

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) return null

    const data = await res.json()
    const categories = data.data || data

    if (Array.isArray(categories)) {
      return categories.find((cat: Category) => cat.slug === slug) || null
    }

    return null
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const data = await res.json()
    const categories = data.data || data

    return Array.isArray(categories)
      ? categories.map((category: Category) => ({
        slug: category.slug,
      }))
      : []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.slug)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    }
  }

  const categoryUrl = `https://www.gobazaar.in/category/${params.slug}`

  return {
    title: category.name,
    description: `Shop for ${category.name} online at Go Bazar. Best prices and fast delivery.`,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: category.name,
      description: `Shop for ${category.name} online at Go Bazar.`,
      images: category.image ? [category.image] : [],
      url: categoryUrl,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory(params.slug)
  return <CategoryClient category={category} />
}
