import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de imágenes para next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Por defecto Next solo tiene imageSizes chicos para <img> de ancho fijo
    // (16-384px) y después salta directo a deviceSizes (640px en adelante).
    // El avatar de About se muestra a lo sumo a 320px (2x retina = 640px
    // reales), así que 640 técnicamente no está mal — pero para pantallas
    // no-retina o el breakpoint de 288px en mobile, Next no tenía ninguna
    // opción intermedia y siempre terminaba sirviendo el de 640. Agregamos
    // 320 y 480 para que pueda elegir algo más ajustado en esos casos.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 480],
  },
  
  // Arregla el warning del lockfile
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;