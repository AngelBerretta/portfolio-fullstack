import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    // Reemplazá por tu dominio real una vez que lo tengas.
    // Si no tenés sitemap.xml, podés borrar esta línea sin problema.
    sitemap: 'https://portfolio-fullstack-angel.vercel.app/sitemap.xml',
  };
}
