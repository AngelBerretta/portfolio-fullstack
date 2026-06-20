/**
 * Re-siembra la tabla Skill con los datos REALES que usa el componente
 * Skills.tsx (estética terminal), reemplazando el seed incorrecto de la Etapa 2
 * que se basaba en data/skills.ts (archivo huérfano, nunca importado en el front).
 *
 * Correr una sola vez:
 *   npx tsx prisma/reseed-skills.ts
 * (o con dotenv si tu shell no carga .env.local automáticamente:
 *   npx dotenv -e .env.local -- npx tsx prisma/reseed-skills.ts)
 */


import { config } from 'dotenv';
import { resolve } from 'path';

// Carga .env.local antes de crear la conexión
config({ path: resolve(__dirname, '..', '.env.local') });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillsData = [
  // ─── frontend ────────────────────────────────────────────────────────────
  {
    name: 'react.js',
    description: 'Hooks, Context API, React Router y optimización de rendimiento.',
    iconUrl: `${DEVICON}/react/react-original.svg`,
    category: 'frontend',
    order: 0,
  },
  {
    name: 'typescript',
    description: 'Tipado estático, interfaces, genéricos y utility types.',
    iconUrl: `${DEVICON}/typescript/typescript-original.svg`,
    category: 'frontend',
    order: 1,
  },
  {
    name: 'javascript',
    description: 'ES2023+, async/await, consumo de APIs y manipulación del DOM.',
    iconUrl: `${DEVICON}/javascript/javascript-original.svg`,
    category: 'frontend',
    order: 2,
  },
  {
    name: 'tailwindcss',
    description: 'Diseño utilitario mobile-first con tokens personalizados.',
    iconUrl: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
    category: 'frontend',
    order: 3,
  },
  {
    name: 'html5-css3',
    description: 'Semántica, animaciones CSS, Grid y Flexbox para layouts complejos.',
    iconUrl: `${DEVICON}/html5/html5-original.svg`,
    category: 'frontend',
    order: 4,
  },
  {
    name: 'vite',
    description: 'Bundler ultrarrápido con HMR y code splitting automático.',
    iconUrl: `${DEVICON}/vite/vite-original.svg`,
    category: 'frontend',
    order: 5,
  },

  // ─── backend ─────────────────────────────────────────────────────────────
  {
    name: 'node.js',
    description: 'Runtime para APIs RESTful con arquitectura en capas.',
    iconUrl: `${DEVICON}/nodejs/nodejs-original.svg`,
    category: 'backend',
    order: 0,
  },
  {
    name: 'express.js',
    description: 'Framework HTTP con middlewares, JWT, Joi y Socket.io.',
    iconUrl: `${DEVICON}/express/express-original.svg`,
    invertIcon: true,
    category: 'backend',
    order: 1,
  },
  {
    name: 'postgresql',
    description: 'Base de datos relacional con Prisma ORM y migraciones type-safe.',
    iconUrl: `${DEVICON}/postgresql/postgresql-original.svg`,
    category: 'backend',
    order: 2,
  },
  {
    name: 'mongodb',
    description: 'Base de datos NoSQL con Mongoose ODM para esquemas flexibles.',
    iconUrl: `${DEVICON}/mongodb/mongodb-original.svg`,
    category: 'backend',
    order: 3,
  },
  {
    name: 'firebase',
    description: 'Firestore, Authentication y Hosting para apps en tiempo real.',
    iconUrl: `${DEVICON}/firebase/firebase-plain.svg`,
    category: 'backend',
    order: 4,
  },
  {
    name: 'api-rest',
    description: 'Diseño y consumo de APIs RESTful con auth JWT y paginación.',
    iconName: 'Network',
    category: 'backend',
    order: 5,
  },

  // ─── tools ───────────────────────────────────────────────────────────────
  {
    name: 'git-github',
    description: 'Control de versiones con flujos de trabajo por ramas y code reviews.',
    iconUrl: `${DEVICON}/git/git-original.svg`,
    category: 'tools',
    order: 0,
  },
  {
    name: 'next.js',
    description: 'SSR, SSG y App Router para webs de alto rendimiento con React.',
    iconUrl: `${DEVICON}/nextjs/nextjs-original.svg`,
    invertIcon: true,
    category: 'tools',
    order: 1,
  },
  {
    name: 'prisma-orm',
    description: 'ORM type-safe con migraciones automáticas y cliente auto-generado.',
    iconUrl: `${DEVICON}/prisma/prisma-original.svg`,
    invertIcon: true,
    category: 'tools',
    order: 2,
  },
  {
    name: 'vercel-netlify',
    description: 'Deploy continuo desde GitHub con preview environments automáticos.',
    iconUrl: `${DEVICON}/vercel/vercel-original.svg`,
    invertIcon: true,
    category: 'tools',
    order: 3,
  },
  {
    name: 'responsive-design',
    description: 'Mobile-first en todos los proyectos con layouts y componentes adaptativos.',
    iconName: 'MonitorSmartphone',
    category: 'tools',
    order: 4,
  },
  {
    name: 'ui-ux',
    description: 'Interfaces atractivas, accesibles y centradas en la experiencia del usuario.',
    iconName: 'Palette',
    category: 'tools',
    order: 5,
  },
];

async function main() {
  console.log('🗑️  Borrando skills anteriores (del seed incorrecto)...');
  await prisma.skill.deleteMany();

  console.log('🌱 Sembrando skills reales (estética terminal)...');
  await prisma.skill.createMany({ data: skillsData });

  console.log(`✅ Listo. ${skillsData.length} skills sembradas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
