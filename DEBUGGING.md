# Debugging Guide

## 1. Error "Failed to fetch or parse URL"
**Cause:** Target website blocks bots or URL is invalid.
**Solution:** 
- Ensure URL is valid and uses `http://` or `https://`.
- Some websites (Cloudflare protected) block Node.js requests. For these cases, we need a proxy or headless browser (Puppeteer/Playwright) in the future.

## 2. Tailwind CSS not working / UI broken
**Cause:** Tailwind configuration not generated.
**Solution:** Restart development server (`npm run dev`).

## 3. CORS Error in Browser
**Cause:** Fetching external URL directly from Client Component.
**Solution:** Always use API Route (`/api/...`) in Next.js as a proxy for external data fetching, as implemented in this project.
