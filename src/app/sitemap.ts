import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/usluge', priority: 0.9 },
    { path: '/usluge/namestaj', priority: 0.9 },
    { path: '/usluge/vozila', priority: 0.9 },
    { path: '/proces', priority: 0.7 },
    { path: '/rezultati', priority: 0.8 },
    { path: '/o-nama', priority: 0.6 },
    { path: '/kontakt', priority: 0.9 },
  ];

  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));
}
