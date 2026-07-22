// About.tsx — Server Component: trae el perfil de la base de datos.
import dynamic from 'next/dynamic';
import { getProfile } from '@/actions/profile';

// AboutClient (Framer Motion + useInView + 8 m.div) se separa en su propio
// chunk vía next/dynamic, igual que Skills.tsx y Projects.tsx — la sección
// está debajo del fold, no hace falta que su JS compita con la hidratación
// de Hero/Navbar en el bundle inicial.
const AboutClient = dynamic(
  () => import('./AboutClient').then((mod) => mod.AboutClient),
  { ssr: true }
);


export default async function About() {
  const profile = await getProfile();

  // Fallback defensivo por si todavía no se sembró el perfil — no debería
  // pasar en producción, pero evita que la sección rompa el build.
  if (!profile) return null;

  return (
    <AboutClient
      bio={profile.bio}
      avatarUrl={profile.avatarUrl}
      location={profile.location}
      education={profile.education}
      experience={profile.experience}
      currentFocus={profile.currentFocus}
      cvUrl={profile.cvUrl}
    />
  );
}
