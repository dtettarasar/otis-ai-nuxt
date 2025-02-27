export default defineEventHandler((event) => {
    const url = getRequestURL(event);
    console.log(`Backend API running at: ${url.origin}`);
    return { apiUrl: url.origin };
});
