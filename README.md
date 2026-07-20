# SEO Audit Tool

A simple yet powerful SEO analysis tool built with Next.js. Check basic SEO elements (Title, Meta Description, H1, OG Tags, Canonical) of any website instantly.

## ✨ Features
- ✅ Real-time SEO element extraction
- ✅ Clean and responsive UI with Tailwind CSS
- ✅ Server-side rendering for optimal performance
- ✅ Web3-ready architecture (prepared for wallet integration)
- ✅ Secure environment variable handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jejakmasgondrong/seo-audit-tool.git
   cd seo-audit-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

## 📖 Usage
1. Enter any website URL (e.g., `google.com`, `github.com`)
2. Click the Audit button
3. View the extracted SEO elements:
   - Page Title
   - Meta Description
   - H1 Heading
   - Open Graph Title
   - Canonical URL

## 🛠️ Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- HTML Parser: Cheerio
- Deployment: Vercel-ready

## 🔒 Security
This project follows security best practices:
- ✅ Sensitive environment variables are stored in `.env.local` (never committed to Git)
- ✅ API routes run server-side, keeping secrets safe from browser inspection
- ✅ `.env*` files are properly ignored in `.gitignore`

## ⚠️ Known Issues (Development Only)

### Development Server Network Access
- Issue: When accessing the development server via network IP (e.g., `http://192.168.101.6:3000`), WebSocket HMR (Hot Module Replacement) connections may fail, showing errors in the browser console.
- Impact: 
  - ❌ WebSocket connection errors in Console (development only)
  - ✅ Application functionality remains 100% operational
  - ✅ All features work correctly
- Solution: Use `http://localhost:3000` for development. This is a known limitation of Next.js development server with Turbopack when binding to network interfaces.
- Note: This issue does NOT affect production deployments (Vercel, etc.). The production build has zero WebSocket dependencies and works perfectly from any domain.

### Web3 Wallet Connection
For Web3 features (planned):
- ✅ Wallet connection works perfectly on `localhost:3000`
- ⚠️ Always use localhost for development with Web3 integrations to avoid browser security restrictions on IP addresses.

---

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author
Gondrong  
GitHub: [jejakmasgondrong](https://github.com/jejakmasgondrong)

---
Built with ❤️ using Next.js + Web3 Ready Architecture
```