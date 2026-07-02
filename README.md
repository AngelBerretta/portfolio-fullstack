# Angel Berretta — Portfolio Full Stack

Portfolio personal construido como una aplicación **full stack real**, no como una landing estática: tiene su propia base de datos, autenticación, panel de administración y envío de mails server-side. La idea fue que el portfolio en sí mismo funcione como una pieza más para mostrar en una entrevista, no solo como una vidriera de proyectos.

🔗 **Demo en vivo:** [https://portfolio-fullstack-angel.vercel.app/](https://portfolio-fullstack-angel.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon%2FVercel-4169E1?logo=postgresql&logoColor=white)
![NextAuth](https://img.shields.io/badge/Auth.js-v5-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email-000000)

---

## Tabla de contenidos

- [Por qué un portfolio con backend](#por-qué-un-portfolio-con-backend)
- [Features](#features)
- [Stack tecnológico](#stack-tecnológico)
- [Decisión de arquitectura: contacto vía Server Action en vez de EmailJS](#decisión-de-arquitectura-contacto-vía-server-action-en-vez-de-emailjs)
- [Modelo de datos](#modelo-de-datos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Empezar en local](#empezar-en-local)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Seguridad](#seguridad)
- [Roadmap](#roadmap)
- [Contacto](#contacto)

---

## Por qué un portfolio con backend

La mayoría de los portfolios son una SPA estática con los proyectos hardcodeados en un array. Acá decidí ir un paso más allá y construirlo como una aplicación full stack real, con base de datos propia detrás, por varias razones concretas:

- **Es la prueba, no el currículum.** Cualquiera puede poner "Full Stack Developer" en un CV. Un portfolio con login, roles, validación server-side y rate limiting demuestra esas habilidades en código que se puede inspeccionar.
- **Panel de administración propio.** Proyectos, skills y perfil se editan desde `/admin` sin tocar código ni redeployar — el contenido vive en Postgres, no en un archivo `data/projects.ts` hardcodeado. (De hecho, ese era justamente el approach anterior: ver el roadmap de migraciones más abajo.)
- **Autenticación real.** NextAuth v5 con Credentials + JWT, sesiones, rutas protegidas vía middleware — el mismo patrón que se usa en proyectos de producción.
- **Manejo de archivos.** Subida de imágenes a Vercel Blob para avatar e imágenes de proyectos, en vez de assets estáticos en `/public`.
- **Decisiones de seguridad reales.** Rate limiting, honeypot anti-spam, hashing de contraseñas — cosas que un sitio estático simplemente no necesita, y que acá sí están resueltas.
- **Es un proyecto vivo.** Puedo seguir agregando features (nuevos modelos, nuevas vistas de admin) sin que se sienta como "terminado" — y eso da pie a conversaciones reales en una entrevista sobre por qué tomé cada decisión.

---

## Features

### Sitio público

- Hero con efecto typewriter, stats y enlaces sociales
- Sección de proyectos con filtro por categoría (Full Stack / Frontend / Landing) y estado "en construcción" para proyectos en desarrollo
- Sección de skills con estética de terminal: categorías por stack (frontend / backend / tools), árbol expandible por skill con descripción
- Formulario de contacto server-side (ver sección de arquitectura más abajo)
- Modo claro/oscuro persistente
- Totalmente responsive

### Panel de administración (`/admin`)

- Login con Credentials (NextAuth v5) protegido por middleware
- CRUD de proyectos, con tags reutilizables y reordenamiento
- CRUD de skills por categoría, con ícono (URL externa o ícono Lucide como fallback)
- Edición de perfil con subida de avatar (Vercel Blob)
- Rate limiting sobre intentos de login fallidos

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions) |
| Lenguaje | TypeScript |
| UI | React 19, Tailwind CSS 4, Framer Motion, Lucide Icons |
| Backend | Server Actions + Route Handlers |
| Base de datos | PostgreSQL + Prisma 7 (`@prisma/adapter-pg`) |
| Autenticación | NextAuth (Auth.js) v5 — Credentials + JWT |
| Validación | Zod 4 (schemas compartidos entre cliente y servidor) |
| Archivos | Vercel Blob Storage |
| Email | Resend (Server Actions, sin SDK en el cliente) |
| Hashing | bcryptjs |

---

## Decisión de arquitectura: contacto vía Server Action en vez de EmailJS

El formulario de contacto arrancó con **EmailJS**, una solución 100% client-side: el navegador llama directo a la API de EmailJS con un Service ID, Template ID y Public Key embebidos en el bundle de JS. Funciona, pero tiene límites que se vuelven más evidentes una vez que el proyecto ya tiene su propio backend:

| | EmailJS (antes) | Server Action + Resend (ahora) |
|---|---|---|
| Dónde corre el envío | En el navegador del visitante | En el servidor |
| Credenciales expuestas | Service ID / Template ID / Public Key visibles en el bundle | Ninguna — la API key nunca sale del servidor |
| Anti-spam | No hay manera real de filtrar bots desde el cliente | Honeypot + rate limiting (server-side, no se puede esquivar) |
| Validación | Solo en el cliente (fácil de saltear con DevTools) | Zod en el servidor, no se puede bypassear |
| Plantilla del mail | Configurada en el dashboard de un tercero | HTML propio, versionado junto al código |
| Dependencia externa | SDK de cliente (`@emailjs/browser`) en el bundle | Ninguna librería de cliente — Resend corre solo en el server |

**El beneficio de fondo:** una vez que el proyecto ya tiene Server Actions, Prisma y un patrón de validación establecido para todo lo demás (proyectos, skills, login), dejar el contacto resuelto por un widget de terceros del lado del cliente era la pieza inconsistente del stack. Migrarlo no es solo "más prolijo" — cierra el único punto donde había credenciales expuestas en el cliente y el único formulario sin rate limiting real.

La protección anti-spam reutiliza la misma tabla `LoginAttempt` que ya usaba el login de admin, namespaceando el identificador (`contact:<ip>` vs. la IP pelada del login) en vez de crear una tabla nueva — la misma ventana de 15 minutos / 5 intentos sirve para los dos casos sin pisarse entre sí.

---

## Modelo de datos

```
Project   — proyectos del portfolio (tags, categoría, estado, destacado)
Tag       — etiquetas reutilizables entre proyectos
Skill     — skills por categoría, con ícono (URL o fallback Lucide)
Profile   — datos editables del perfil (avatar, bio)
AdminUser — único usuario admin (credentials + hash bcrypt)
LoginAttempt — rate limiting (reutilizado para login y para el formulario de contacto)
```

Esquema completo en [`prisma/schema.prisma`](./prisma/schema.prisma).

---

## Estructura del proyecto

```
src/
├── actions/          # Server Actions (auth, contact, profile, projects, skills, tags, upload)
├── app/
│   ├── admin/        # Panel de administración (protegido por middleware)
│   ├── api/          # Route Handlers (NextAuth, upload directo a Blob)
│   └── (resto)        # Páginas públicas
├── components/
│   ├── admin/        # Componentes exclusivos del panel
│   └── ...           # Secciones públicas (Hero, Projects, Skills, Contact, etc.)
├── context/          # ThemeContext (dark/light)
├── hooks/            # Hooks custom (useTypewriter, etc.)
├── lib/              # action-types, validations (Zod), rate-limit, db (Prisma), constants
├── types/            # Tipos compartidos + augmentación de next-auth
├── auth.ts / auth.config.ts  # Configuración de NextAuth (split edge-safe / full)
└── proxy.ts          # Middleware de protección de rutas /admin
```

---

## Empezar en local

```bash
git clone https://github.com/AngelBerretta/portfolio-fullstack.git
cd portfolio-fullstack
npm install
```

`npm install` dispara automáticamente `prisma generate` (hook `postinstall`).

Completá `.env.local` (ver [Variables de entorno](#variables-de-entorno)) y después:

```bash
npx prisma migrate dev   # aplica el schema contra tu base de Postgres
npx prisma db seed       # opcional — datos iniciales
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

| Variable | Para qué | Dónde conseguirla |
|---|---|---|
| `DATABASE_URL` | Conexión a Postgres | Tu proveedor (Neon, Vercel Postgres, etc.) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Usuario admin que crea el seed | Las definís vos |
| `AUTH_SECRET` | Firma de sesiones JWT | `npx auth secret` |
| `AUTH_URL` | URL base de la app | `http://localhost:3000` en dev |
| `AUTH_TRUST_HOST` | Requerido por NextAuth detrás de proxy (Vercel) | `true` |
| `BLOB_READ_WRITE_TOKEN` | Subida de imágenes | Vercel Blob Storage |
| `RESEND_API_KEY` | Envío del formulario de contacto | [resend.com](https://resend.com) → API Keys |
| `CONTACT_TO_EMAIL` | A dónde llegan los mensajes | Tu email (debe coincidir con la cuenta de Resend si usás el sender de pruebas `onboarding@resend.dev`) |

---

## Scripts disponibles

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run start    # levanta el build de producción
npm run lint     # ESLint
npx prisma studio        # explorar la base de datos visualmente
npx prisma migrate dev   # aplicar cambios de schema
```

---

## Seguridad

- **Contraseñas:** hasheadas con bcrypt, nunca en texto plano.
- **Sesiones:** JWT firmado, rutas `/admin/*` protegidas por middleware (`proxy.ts` + `auth.config.ts`).
- **Rate limiting:** máximo 5 intentos cada 15 minutos por IP, tanto para login fallido como para envíos del formulario de contacto (tabla `LoginAttempt`, identificadores namespaceados).
- **Anti-spam:** honeypot invisible en el formulario de contacto — los bots lo completan, las personas no.
- **Validación:** todos los formularios usan Zod en el servidor, no solo en el cliente.
- **Sin credenciales en el cliente:** las API keys (Resend, Blob) viven únicamente en el servidor.

---

## Roadmap

- [ ] Tests automatizados (Vitest + Testing Library)
- [ ] Internacionalización (ES/EN)
- [x] Analytics propio sin depender de cookies de terceros
- [ ] Más proyectos cargados desde el panel de admin

---

## Contacto

- **GitHub:** [@AngelBerretta](https://github.com/AngelBerretta)
- **LinkedIn:** [angelberretta](https://linkedin.com/in/angelberretta)
- **Email:** a través del [formulario de contacto](https://portfolio-fullstack-angel.vercel.app/#contact) del sitio

---

<p align="center">Hecho con Next.js, Prisma y demasiado café ☕ — Buenos Aires, Argentina 🇦🇷</p>
