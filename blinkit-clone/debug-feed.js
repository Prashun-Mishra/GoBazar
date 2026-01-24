const fetch = require('node-fetch');

// Hardcode the URL based on what I expect, or I'll update it after reading api-config
const BACKEND_URL = 'http://localhost:5000'; // Default guess, will update if api-config is different

async function testFeed() {
    try {
        console.log(`Fetching from ${BACKEND_URL}/api/products?limit=5000...`);
        const response = await fetch(`${BACKEND_URL}/api/products?limit=5000`);

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response body:', text);
            return;
        }

        const data = await response.json();
        console.log('Data keys:', Object.keys(data));

        const products = data.products || data.data || [];
        console.log(`Found ${products.length} products.`);

        if (products.length > 0) {
            console.log('First product sample:', JSON.stringify(products[0], null, 2));

            // Test XML generation logic for first product
            const product = products[0];
            const baseUrl = 'https://www.gobazaar.in';
            const productUrl = `${baseUrl}/product/${product.id}`;
            let imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';

            console.log('Generated Image URL:', imageUrl);
        }
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

testFeed();
