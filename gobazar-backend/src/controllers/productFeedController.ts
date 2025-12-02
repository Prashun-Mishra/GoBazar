import { Request, Response } from 'express';
import prisma from '@/config/database';
import config from '@/config';
import { asyncHandler } from '@/middleware/errorHandler';

class ProductFeedController {
    getGoogleMerchantFeed = asyncHandler(async (req: Request, res: Response) => {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            include: {
                category: true,
                variants: {
                    where: { isActive: true },
                    orderBy: { price: 'asc' },
                    take: 1
                }
            }
        });

        const xmlItems = products.map(product => {
            const price = product.variants[0]?.price || product.price;
            const image = product.images[0] || '';
            const link = `${config.frontendUrl}/product/${product.id}`;
            // Strip HTML tags from description if present, or use name
            const description = product.description
                ? product.description.replace(/<[^>]*>?/gm, '')
                : product.name;

            return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${link}</g:link>
      <g:image_link>${image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.stock > 0 ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${price} INR</g:price>
      <g:brand><![CDATA[${product.brand || 'Go Bazar'}]]></g:brand>
      <g:google_product_category><![CDATA[${product.category?.name || 'Food, Beverages & Tobacco'}]]></g:google_product_category>
    </item>`;
        }).join('');

        const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Go Bazar Product Feed</title>
    <link>${config.frontendUrl}</link>
    <description>Go Bazar - Grocery Delivery in Pune</description>
    ${xmlItems}
  </channel>
</rss>`;

        res.set('Content-Type', 'application/xml');
        res.send(xml);
    });
}

export default new ProductFeedController();
