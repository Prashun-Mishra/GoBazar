
async function main() {
    try {
        const response = await fetch('http://localhost:3001/api/products/home');
        const data = await response.json();

        console.log('API Response Keys:', Object.keys(data));

        const newCategories = ['cold-drinks-juices', 'bakery-biscuits', 'chicken-meat-fish'];

        newCategories.forEach(slug => {
            if (data[slug]) {
                console.log(`✅ ${slug}: ${data[slug].length} products`);
            } else {
                console.log(`❌ ${slug}: Missing in response`);
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
