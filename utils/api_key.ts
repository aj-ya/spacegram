const api_key = process.env.NASA_API_KEY;
if (!api_key) {
    throw new Error('Define the NASA_API_KEY environmental variable');
}
export default api_key;
