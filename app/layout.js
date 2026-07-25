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
  title: "SEO Audit Tool — Free Website SEO Checker & Analyzer",
  description:
    "Free SEO audit tool for developers. Check meta tags, analyze headings, find canonical URLs, and improve your website search engine optimization.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SEO Audit Tool — Free Website SEO Checker & Analyzer",
    description:
      "Free SEO audit tool for developers. Check meta tags, analyze headings, find canonical URLs, and improve your website search engine optimization.",
    url: "https://seo-audit-tool.vercel.app",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
