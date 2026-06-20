import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const projectsData = [
  {
    title: 'Fire Market',
    slug: 'fire-market',
    description:
      'E-commerce moderno desarrollado con React y Firebase. Incluye autenticación de usuarios, carrito de compras en tiempo real, gestión de productos con Firestore y una UI fluida con Vite.',
    imageUrl: '/images/firemarket.jpg',
    tags: ['React', 'Firebase', 'Firestore', 'JavaScript', 'Vite'],
    codeUrl: 'https://github.com/AngelBerretta/FireMarket',
    demoUrl: 'https://fire-market-angel.vercel.app/',
    category: 'fullstack',
    featured: true,
    order: 1,
  },
  {
    title: 'E-commerce Dashboard',
    slug: 'ecommerce-dashboard',
    description:
      'Panel de administración moderno para e-commerce. Gestión de productos, análisis de ventas y estadísticas en tiempo real con una interfaz limpia y profesional construida con TypeScript.',
    imageUrl: '/images/dashboard.jpg',
    tags: ['React', 'TypeScript', 'Tailwind'],
    codeUrl: 'https://github.com/AngelBerretta/ForShop',
    demoUrl: 'https://forshop.netlify.app/',
    category: 'fullstack',
    featured: true,
    order: 2,
  },
  {
    title: 'ShopFast',
    slug: 'shopfast',
    description:
      'Tienda online moderna con catálogo dinámico, filtros por categoría y carrito de compras. Consume una API externa para obtener productos y se despliega en Netlify.',
    imageUrl: '/images/shopfast.jpg',
    tags: ['React', 'Vite', 'Tailwind', 'JavaScript', 'API REST'],
    codeUrl: 'https://github.com/AngelBerretta/shop',
    demoUrl: 'https://theshopfast.netlify.app',
    category: 'frontend',
    featured: true,
    order: 3,
  },
  {
    title: 'TerraCart',
    slug: 'terracart',
    description:
      'E-commerce ecológico ficticio con catálogo de productos orgánicos, filtros, carrito persistente con LocalStorage y diseño responsivo. Construido con vanilla JS.',
    imageUrl: '/images/terracart.jpg',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    codeUrl: 'https://github.com/AngelBerretta/TerraCart',
    demoUrl: 'https://terracart.netlify.app/',
    category: 'frontend',
    featured: false,
    order: 4,
  },
  {
    title: 'AppWeather',
    slug: 'appweather',
    description:
      'Aplicación del clima moderna y responsive que consume la OpenWeatherMap API. Permite buscar ciudades y visualizar temperatura, humedad y pronóstico extendido.',
    imageUrl: '/images/appweather.jpg',
    tags: ['HTML', 'CSS', 'JavaScript', 'API REST'],
    codeUrl: 'https://github.com/AngelBerretta/appweather',
    demoUrl: 'https://around-weather.netlify.app',
    category: 'frontend',
    featured: false,
    order: 5,
  },
  {
    title: 'CoffeeCraft',
    slug: 'coffeecraft',
    description:
      'Sitio web estático para una cafetería ficticia con menú interactivo, galería de productos y formulario de contacto. Diseño cálido y atractivo con HTML/CSS/JS.',
    imageUrl: '/images/coffeecraft.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    codeUrl: 'https://github.com/AngelBerretta/CoffeeCraft',
    demoUrl: 'https://coffecrafft.netlify.app/',
    category: 'landing',
    featured: false,
    order: 6,
  },
  {
    title: 'Serenity Studio',
    slug: 'serenity-studio',
    description:
      'Landing page elegante y minimalista para un estudio de bienestar. Diseño limpio, animaciones suaves, secciones de servicios y formulario de reserva de sesiones.',
    imageUrl: '/images/serenity.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    codeUrl: 'https://github.com/AngelBerretta/SERENITY-STUDIO',
    demoUrl: 'https://serenityestudio.netlify.app',
    category: 'landing',
    featured: false,
    order: 7,
  },
  {
    title: 'PAWCARE',
    slug: 'pawcare',
    description:
      'Landing page moderna para una clínica veterinaria. Presenta servicios, galería de mascotas, testimonios y un CTA de reserva de turno online con diseño atractivo.',
    imageUrl: '/images/pawcare.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    codeUrl: 'https://github.com/AngelBerretta/PAWCARE',
    demoUrl: 'https://we-pawcare.netlify.app',
    category: 'landing',
    featured: false,
    order: 8,
  },
  {
    title: 'BookWise',
    slug: 'bookwise',
    description:
      'Plataforma e-commerce de libros físicos y e-books con backend completo en Node.js y Express. Incluye autenticación JWT, carrito persistente, gestión de stock, WebSockets para actualizaciones en tiempo real y panel de administración.',
    imageUrl: '/images/bookwise.jpg',
    tags: ['Node.js', 'Express', 'MongoDB', 'React', 'Socket.io', 'JWT'],
    codeUrl: 'https://github.com/AngelBerretta',
    demoUrl: '#',
    category: 'fullstack',
    status: 'in-progress',
    statusLabel: 'En construcción',
    order: 9,
  },
  {
    title: 'PsicoAgenda',
    slug: 'psicoagenda',
    description:
      'Sistema de gestión para psicólogos y pacientes. Permite agendar turnos, gestionar expedientes clínicos, cancelaciones con control de roles y soft delete con bandeja de eliminados. Backend con Prisma y PostgreSQL.',
    imageUrl: '/images/psicoagenda.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    codeUrl: 'https://github.com/AngelBerretta',
    demoUrl: '#',
    category: 'fullstack',
    status: 'in-progress',
    statusLabel: 'En construcción',
    order: 10,
  },
];

const skillsData = [
  // Frontend
  { name: 'React.js', level: 90, icon: 'Atom', category: 'Frontend', order: 1 },
  { name: 'JavaScript', level: 92, icon: 'FileJson', category: 'Frontend', order: 2 },
  { name: 'TypeScript', level: 75, icon: 'Braces', category: 'Frontend', order: 3 },
  { name: 'HTML5 / CSS3', level: 95, icon: 'Globe', category: 'Frontend', order: 4 },
  { name: 'Tailwind CSS', level: 88, icon: 'Palette', category: 'Frontend', order: 5 },
  { name: 'Vite', level: 85, icon: 'Zap', category: 'Frontend', order: 6 },
  // Backend
  { name: 'Node.js', level: 78, icon: 'Server', category: 'Backend', order: 1 },
  { name: 'Express.js', level: 75, icon: 'Train', category: 'Backend', order: 2 },
  { name: 'Firebase', level: 85, icon: 'Flame', category: 'Backend', order: 3 },
  { name: 'MongoDB', level: 65, icon: 'Leaf', category: 'Backend', order: 4 },
  { name: 'API REST', level: 85, icon: 'Plug', category: 'Backend', order: 5 },
  { name: 'PostgreSQL', level: 60, icon: 'Terminal', category: 'Backend', order: 6 },
  // Herramientas
  { name: 'Git / GitHub', level: 88, icon: 'GitBranch', category: 'Herramientas', order: 1 },
  { name: 'Netlify / Vercel', level: 90, icon: 'Rocket', category: 'Herramientas', order: 2 },
  { name: 'Responsive Design', level: 92, icon: 'Smartphone', category: 'Herramientas', order: 3 },
  { name: 'UI / UX', level: 78, icon: 'Target', category: 'Herramientas', order: 4 },
  { name: 'Handlebars', level: 65, icon: 'Monitor', category: 'Herramientas', order: 5 },
  { name: 'Socket.io', level: 55, icon: 'Zap', category: 'Herramientas', order: 6 },
];

async function main() {
  console.log('🌱 Sembrando proyectos...');
  for (const p of projectsData) {
    const { tags, ...projectFields } = p;
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...projectFields,
        tags: {
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
  }

  console.log('🌱 Sembrando skills...');
  for (const s of skillsData) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }

  console.log('🌱 Sembrando perfil...');
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        bio:
          'Desarrollador web Full Stack freelance apasionado por construir experiencias modernas, rápidas y atractivas usando JavaScript / React, con experiencia en Node.js, Firebase y MongoDB.\n\nActualmente curso la Licenciatura en Sistemas de Información en la Universidad Nacional de Luján (UNLu), lo que complementa mi formación técnica autodidacta con una sólida base académica.\n\nSoy proactivo, orientado a resultados, con gran capacidad de aprendizaje y siempre en búsqueda de nuevos desafíos que me permitan crecer profesionalmente.',
        avatarUrl: '/images/avatar.jpg',
        location: 'Chivilcoy, Buenos Aires, Argentina',
        education: 'Lic. en Sistemas de Información — UNLu (En curso)',
        experience: 'Desarrollador Web Freelance (2024 – Actualidad)',
        currentFocus: 'Full Stack — React + Node.js + MongoDB + Firebase',
        cvUrl: '/cv-angel-berretta.pdf',
      },
    });
  }

  console.log('🌱 Sembrando usuario admin...');
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error('Faltan ADMIN_EMAIL o ADMIN_PASSWORD en .env.local');
  }
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  console.log('✅ Seed completo.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });