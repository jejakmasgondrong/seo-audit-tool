import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { URL } from 'url';
import { isIP } from 'net';
import dns from 'dns/promises';

function isPrivateIP(ip) {
  if (isIP(ip) === 0) return false;
  const parts = ip.split('.').map(Number);
  if (parts[0] === 10) return true;
  if (parts[0] === 127) return true;
  if (parts[0] === 169 && parts[1] === 254) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 0) return true;
  if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return true;
  if (parts[0] === 198 && parts[1] === 18) return true;
  return false;
}

async function validateUrl(inputUrl) {
  let parsed;
  try {
    parsed = new URL(inputUrl);
  } catch {
    throw new Error('Invalid URL');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS URLs are allowed');
  }

  const hostname = parsed.hostname.toLowerCase();

  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '[::1]') {
    throw new Error('Access to localhost is not allowed');
  }

  if (hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    throw new Error('Access to internal domains is not allowed');
  }

  const cloudMetadata = [
    '169.254.169.254',
    'metadata.google.internal',
    'metadata.sysdigcloud.com',
    '100.100.100.200',
  ];
  if (cloudMetadata.includes(hostname)) {
    throw new Error('Access to cloud metadata endpoints is not allowed');
  }

  if (isIP(hostname) === 4) {
    if (isPrivateIP(hostname)) {
      throw new Error('Access to private IP addresses is not allowed');
    }
  }

  if (isIP(hostname) === 0) {
    try {
      const addresses = await dns.resolve4(hostname);
      for (const addr of addresses) {
        if (isPrivateIP(addr)) {
          throw new Error('Target resolves to a private IP address');
        }
      }
    } catch {
      throw new Error('Unable to resolve target hostname');
    }
  }

  return parsed.toString();
}

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    const validatedUrl = await validateUrl(url);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(validatedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GondrongSEOBot/1.0)',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!response.ok) throw new Error('Failed to access URL');

    const html = await response.text();
    const $ = cheerio.load(html);

    const seoData = {
      title: $('title').text().trim() || 'No Title Found',
      description: $('meta[name="description"]').attr('content') || 'No Meta Description Found',
      h1: $('h1').first().text().trim() || 'No H1 Found',
      ogTitle: $('meta[property="og:title"]').attr('content') || 'No OG Title Found',
      canonical: $('link[rel="canonical"]').attr('href') || 'No Canonical Found',
    };

    return NextResponse.json(seoData);
  } catch (error) {
    const message = error.message === 'Failed to access URL'
      ? 'Failed to access URL'
      : 'Failed to fetch or parse URL data';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
