import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Fire Market",
    description:
      "E-commerce moderno desarrollado con React y Firebase. Incluye autenticación de usuarios, carrito de compras en tiempo real, gestión de productos con Firestore y una UI fluida con Vite.",
    image: "/images/firemarket.jpg",
    tags: ["React", "Firebase", "Firestore", "JavaScript", "Vite"],
    codeUrl: "https://github.com/AngelBerretta/FireMarket",
    demoUrl: "https://fire-market-angel.vercel.app/",
    category: "fullstack",
    featured: true,
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description:
      "Panel de administración moderno para e-commerce. Gestión de productos, análisis de ventas y estadísticas en tiempo real con una interfaz limpia y profesional construida con TypeScript.",
    image: "/images/dashboard.jpg",
    tags: ["React", "TypeScript", "Tailwind"],
    codeUrl: "https://github.com/AngelBerretta/ForShop",
    demoUrl: "https://forshop.netlify.app/",
    category: "fullstack",
    featured: true,
  },
  {
    id: 3,
    title: "ShopFast",
    description:
      "Tienda online moderna con catálogo dinámico, filtros por categoría y carrito de compras. Consume una API externa para obtener productos y se despliega en Netlify.",
    image: "/images/shopfast.jpg",
    tags: ["React", "Vite", "Tailwind", "JavaScript", "API REST"],
    codeUrl: "https://github.com/AngelBerretta/shop",
    demoUrl: "https://theshopfast.netlify.app",
    category: "frontend",
    featured: true,
  },
  {
    id: 4,
    title: "TerraCart",
    description:
      "E-commerce ecológico ficticio con catálogo de productos orgánicos, filtros, carrito persistente con LocalStorage y diseño responsivo. Construido con vanilla JS.",
    image: "/images/terracart.jpg",
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    codeUrl: "https://github.com/AngelBerretta/TerraCart",
    demoUrl: "https://terracart.netlify.app/",
    category: "frontend",
  },
  {
    id: 5,
    title: "AppWeather",
    description:
      "Aplicación del clima moderna y responsive que consume la OpenWeatherMap API. Permite buscar ciudades y visualizar temperatura, humedad y pronóstico extendido.",
    image: "/images/appweather.jpg",
    tags: ["HTML", "CSS", "JavaScript", "API REST"],
    codeUrl: "https://github.com/AngelBerretta/appweather",
    demoUrl: "https://around-weather.netlify.app",
    category: "frontend",
  },
  {
    id: 6,
    title: "CoffeeCraft",
    description:
      "Sitio web estático para una cafetería ficticia con menú interactivo, galería de productos y formulario de contacto. Diseño cálido y atractivo con HTML/CSS/JS.",
    image: "/images/coffeecraft.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    codeUrl: "https://github.com/AngelBerretta/CoffeeCraft",
    demoUrl: "https://coffecrafft.netlify.app/",
    category: "landing",
  },
  {
    id: 7,
    title: "Serenity Studio",
    description:
      "Landing page elegante y minimalista para un estudio de bienestar. Diseño limpio, animaciones suaves, secciones de servicios y formulario de reserva de sesiones.",
    image: "/images/serenity.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    codeUrl: "https://github.com/AngelBerretta/SERENITY-STUDIO",
    demoUrl: "https://serenityestudio.netlify.app",
    category: "landing",
  },
  {
    id: 8,
    title: "PAWCARE",
    description:
      "Landing page moderna para una clínica veterinaria. Presenta servicios, galería de mascotas, testimonios y un CTA de reserva de turno online con diseño atractivo.",
    image: "/images/pawcare.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    codeUrl: "https://github.com/AngelBerretta/PAWCARE",
    demoUrl: "https://we-pawcare.netlify.app",
    category: "landing",
  },
];

export const categories = [
  { id: "all", label: "Todos", emoji: "🚀" },
  { id: "fullstack", label: "Full Stack", emoji: "⚡" },
  { id: "frontend", label: "Frontend", emoji: "🎨" },
  { id: "landing", label: "Landing Pages", emoji: "✨" },
];

// Proyectos en construcción
export const upcomingProjects: Project[] = [
  {
    id: 9,
    title: "BookWise",
    description:
      "Plataforma e-commerce de libros físicos y e-books con backend completo en Node.js y Express. Incluye autenticación JWT, carrito persistente, gestión de stock, WebSockets para actualizaciones en tiempo real y panel de administración.",
    image: "/images/bookwise.jpg",
    tags: ["Node.js", "Express", "MongoDB", "React", "Socket.io", "JWT"],
    codeUrl: "https://github.com/AngelBerretta",
    demoUrl: "#",
    category: "fullstack",
    status: "in-progress",
    statusLabel: "En construcción",
  },
  {
    id: 10,
    title: "PsicoAgenda",
    description:
      "Sistema de gestión para psicólogos y pacientes. Permite agendar turnos, gestionar expedientes clínicos, cancelaciones con control de roles y soft delete con bandeja de eliminados. Backend con Prisma y PostgreSQL.",
    image: "/images/psicoagenda.jpg",
    tags: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Tailwind"],
    codeUrl: "https://github.com/AngelBerretta",
    demoUrl: "#",
    category: "fullstack",
    status: "in-progress",
    statusLabel: "En construcción",
  },
];
