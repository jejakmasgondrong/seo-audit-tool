import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    // SECURITY DEMO: Accessing server-side env var. 
    // This code NEVER reaches the browser, keeping the token safe from F12.
    const secretToken = process.env.SEO_BOT_SECRET_TOKEN;
    
    // Fetch HTML from target URL
    const response = await fetch(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (compatible; GondrongSEOBot/1.0)'
      }
    });
    
    if (!response.ok) throw new Error('Failed to access URL');
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract basic SEO data
    const seoData = {
      title: $('title').text().trim() || 'No Title Found',
      description: $('meta[name="description"]').attr('content') || 'No Meta Description Found',
      h1: $('h1').first().text().trim() || 'No H1 Found',
      ogTitle: $('meta[property="og:title"]').attr('content') || 'No OG Title Found',
      canonical: $('link[rel="canonical"]').attr('href') || 'No Canonical Found',
    };

    return NextResponse.json(seoData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch or parse URL data' }, { status: 500 });
  }
}
