import { BACKEND_URL } from '@/lib/api-config'

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gobazaar.in'

    try {
        // Fetch products from backend
        // Fetching a larger limit to include as many products as possible for the feed
        const response = await fetch(`${BACKEND_URL}/api/products?limit=5000`)
        const data = await response.json()
        const products = data.products || data.data || []

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Go Bazaar Product Feed</title>
    <link>${baseUrl}</link>
    <description>Fresh groceries and daily essentials delivered to your doorstep.</description>
    ${Array.isArray(products) ? products.map((product: any) => {
            const productUrl = `${baseUrl}/product/${product.id}`
            // Ensure image URL is absolute
            let imageUrl = product.images && product.images.length > 0 ? product.images[0] : ''
            if (imageUrl && !imageUrl.startsWith('http')) {
                // If it's a relative path, prepend backend URL or base URL depending on where images are hosted
                // Assuming images might be relative to backend or public
                // For safety, if it looks like a path, try to make it absolute. 
                // If it's from backend uploads, it might need BACKEND_URL. 
                // But usually frontend displays them, so let's assume they are accessible via valid URLs or we construct them.
                // If the current setup uses full URLs in DB, we are good. If not, we might need adjustment.
                // Based on previous file views, images seem to be handled by frontend or are full URLs.
                // Let's assume they are valid or relative to site.
                if (imageUrl.startsWith('/')) {
                    imageUrl = `${baseUrl}${imageUrl}`
                }
            }

            // Strip HTML from description
            const description = product.description
                ? product.description.replace(/<[^>]*>?/gm, '').trim()
                : product.name

            return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:brand>${product.brand || 'Go Bazaar'}</g:brand>
      <g:condition>new</g:condition>
      <g:availability>${product.stock > 0 ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${product.price} INR</g:price>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Standard</g:service>
        <g:price>0 INR</g:price>
      </g:shipping>
    </item>`
        }).join('') : ''}
  </channel>
</rss>`

        return new Response(xml, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
            },
        })
    } catch (error) {
        console.error('Error generating product feed:', error)
        return new Response('Error generating feed', { status: 500 })
    }
}
