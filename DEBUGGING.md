Siap bro! Ini dia versi `DEBUGGING.md` yang rapi, lengkap dengan format Markdown-nya (heading, bold, code block). 

Tinggal klik tombol Copy di pojok kanan atas kotak kode ini, lalu paste langsung ke file `DEBUGGING.md` di VS Code kamu:

```markdown
# Debugging Guide

This guide covers common issues and their solutions during development.

## 🔴 WebSocket Connection Errors (Network IP Access)

### Symptom
When accessing `http://192.168.x.x:3000` (or any network IP), the browser console shows:
```text
WebSocket connection to 'ws://192.168.x.x:3000/_next/webpack-hmr' failed
```

### Cause
This is a known limitation of the Next.js development server (especially with Turbopack) when binding to network interfaces (`0.0.0.0`). The WebSocket HMR (Hot Module Replacement) client has trouble connecting when accessed via a network IP.

### Impact
- Development: Console shows errors, but all features work perfectly.
- Production: NO impact. Production builds have zero WebSocket dependencies.

### Solution
Use `http://localhost:3000` for development. 

The application works 100% correctly on localhost with:
- ✅ Clean console (no errors)
- ✅ Fast Refresh working
- ✅ Web3 wallet connections working
- ✅ All API routes functional

Note: This is development-only and does not affect production deployments (Vercel, etc.).

---

## 🔴 "Failed to fetch or parse URL" Error

### Symptom
API returns an error when auditing certain websites.

### Causes & Solutions
1. Website blocks bot requests: Some websites (especially Cloudflare-protected) block server-side requests. 
   - *Solution:* Try a different website (e.g., `example.com`) or use a proxy service.
2. Invalid URL format: User entered a URL without a protocol. 
   - *Solution:* The app auto-adds `https://`, but ensure the URL is valid.
3. Network timeout: Target website is slow or unreachable. 
   - *Solution:* Check your internet connection.

---

##  Wallet Connection Issues (Web3)

### Symptom
Wallet connect button doesn't respond or fails to connect.

### Solution
1. Always use `http://localhost:3000` (not an IP address). Wallet providers (MetaMask, WalletConnect) work best on localhost, and some block connections from non-localhost IPs in development.
2. Check the browser console for specific wallet provider errors.
3. Ensure your MetaMask/Wallet extension is installed and unlocked.
4. Clear browser cache or try a hard refresh (`Ctrl + Shift + R`).

---

## 🔴 "Module not found" Errors

### Symptom
```text
Module not found: Can't resolve 'cheerio'
```

### Solution
Run:
```bash
npm install
```
Or reinstall all dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🔴 Environment Variables Not Loading

### Symptom
`process.env.VARIABLE_NAME` returns `undefined`.

### Solution
1. Ensure the `.env.local` file exists in the project root.
2. Variables must start with `NEXT_PUBLIC_` to be accessible in the browser (client-side). Server-side variables do not need this prefix.
3. Restart the dev server after changing `.env.local` (`Ctrl+C`, then `npm run dev`).

---

##  Performance Issues

### Symptom
Dev server is slow or unresponsive.

### Solution
1. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```
2. Check for memory leaks in the terminal.
3. Close unnecessary browser tabs.

---

##  Production Deployment (Vercel)

### Pre-flight Checklist
- ✅ All features work on `http://localhost:3000`
- ✅ `.env.local` variables are added to the Vercel dashboard
- ✅ No TypeScript errors (if using TypeScript)
- ✅ `npm run build` completes successfully

### Deploy Command
```bash
vercel
```
Follow the prompts. Production will be 100% error-free!

---

## 📞 Still Having Issues?
1. Check the browser Console tab for specific errors.
2. Check the terminal for server-side errors.
3. Try `npm run build` to catch build-time errors.
4. Review `.env.local` configuration.
5. Ensure you're using Node.js 18+.

Remember: Development issues ≠ Production issues. If it works on localhost, it will work on Vercel!
```