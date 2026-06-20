// About.tsx — Server Component: trae el perfil de la base de datos.
import { getProfile } from '@/actions/profile';
import { AboutClient } from './AboutClient';

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
