import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const origin = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Two routes. Menu changes weekly; Home rarely. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${origin}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${origin}/menu`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];
}
