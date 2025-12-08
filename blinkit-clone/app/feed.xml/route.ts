export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gobazaar.in'
    const backendUrl = 'https://gobazar-backend.onrender.com'

    try {
        console.log('[FEED] Fetching products from:', backendUrl)

        const response = await fetch(`${backendUrl}/api/products?limit=500`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            console.error('[FEED] Backend error:', response.status)
            throw new Error(`Backend error: ${response.status}`)
        }

        const data = await response.json()
        const products = data.data || data.products || []
        console.log('[FEED] Product count:', products.length)

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Go Bazaar Product Feed</title>
    <link>${baseUrl}</link>
    <description>Fresh groceries and daily essentials delivered to your doorstep.</description>
    ${Array.isArray(products) ? products.map((product: any) => {
            const productUrl = `${baseUrl}/product/${product.id}`
            let imageUrl = product.images && product.images.length > 0 ? product.images[0] : ''
            if (imageUrl && !imageUrl.startsWith('http')) {
                if (imageUrl.startsWith('/')) {
                    imageUrl = `${baseUrl}${imageUrl}`
                }
            }

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
