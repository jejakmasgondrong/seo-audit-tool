import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://seo-audit-tool-lac.vercel.app"),
  title: "SEO Audit Tool — Free Website SEO Checker & Analyzer",
  description:
    "Free SEO audit tool for developers. Check meta tags, analyze headings, find canonical URLs, and improve your website search engine optimization.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SEO Audit Tool — Free Website SEO Checker & Analyzer",
    description:
      "Free SEO audit tool for developers. Check meta tags, analyze headings, find canonical URLs, and improve your website search engine optimization.",
    url: "https://seo-audit-tool-lac.vercel.app",
    type: "website",
    siteName: "SEO Audit Tool",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Audit Tool — Free Website SEO Checker & Analyzer",
    description:
      "Free SEO audit tool for developers. Check meta tags, analyze headings, find canonical URLs, and improve your website search engine optimization.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SEO Audit Tool",
              description:
                "Free SEO audit tool for developers. Check meta tags, headings, canonical URLs, and on-page SEO.",
              applicationCategory: "DeveloperApplication",
              url: "https://seo-audit-tool-lac.vercel.app",
              operatingSystem: "Any",
            }),
          }}
        />
        <footer className="mt-auto border-t border-gray-800 py-4 text-center">
          <a
            href="https://www.linkedin.com/in/rsatriya-wicaksana-56b026ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-emerald-400 transition-colors"
          >
            Built by RSatriya · Contact Me
          </a>
        </footer>
      </body>
    </html>
  );
}
