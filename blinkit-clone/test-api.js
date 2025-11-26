// Test frontend API route
async function test() {
    try {
        console.log('Testing frontend /api/products...\n');

        // Get Munchies category ID first
        const catRes = await fetch('http://localhost:3000/api/categories');
        const catData = await catRes.json();
        const categories = catData.data || catData;
        const munchies = categories.find(c => c.slug === 'munchies');

        if (!munchies) {
            console.log('❌ Munchies category not found');
            return;
        }

        console.log(`Found Munchies category: ${munchies.name} (ID: ${munchies.id})\n`);

        // Test frontend API
        console.log('Calling frontend API: /api/products?category=' + munchies.id);
        const res = await fetch(`http://localhost:3000/api/products?category=${munchies.id}&page=1&limit=20`);

        if (!res.ok) {
            console.log(`❌ Frontend API error: ${res.status}`);
            const text = await res.text();
            console.log('Response:', text);
            return;
        }

        const data = await res.json();
        console.log('\nFrontend API Response:');
        console.log(JSON.stringify(data, null, 2));

        console.log(`\n✅ Products returned: ${data.products?.length || 0}`);
        console.log(`Total: ${data.total}`);
        console.log(`Has more: ${data.hasMore}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

test();
