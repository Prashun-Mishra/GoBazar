export async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<Response> {
    try {
        const res = await fetch(url, options);
        if (!res.ok && retries > 0) {
            throw new Error(`Fetch failed with status ${res.status}`);
        }
        return res;
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`⚠️ Fetch failed, retrying in ${delay}ms... (${retries} left)`);
        await new Promise(r => setTimeout(r, delay));
        return fetchWithRetry(url, options, retries - 1, delay);
    }
}
