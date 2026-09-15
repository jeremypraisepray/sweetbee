import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const origin = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
