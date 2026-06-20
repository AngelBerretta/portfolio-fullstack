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
  },
  
  // Arregla el warning del lockfile
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;