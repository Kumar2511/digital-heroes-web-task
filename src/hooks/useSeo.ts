import { useEffect } from 'react';
import { SITE } from '@/utils/constants';
import type { SeoConfig } from '@/types';

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop';

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, data: unknown): void {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}

/**
 * Manages document head metadata for a page: title, description,
 * canonical URL, robots, Open Graph, Twitter card, and JSON-LD.
 */
export function useSeo(config: SeoConfig): void {
  const {
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
    type = 'website',
    noindex = false,
    jsonLd,
  } = config;

  const canonical = `${SITE.url}${path}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setLink('canonical', canonical);

    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE.name);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:site', SITE.twitter);

    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block, i) => setJsonLd(`json-ld-${i}`, block));
    }
  }, [fullTitle, description, canonical, image, type, noindex, jsonLd]);
}
