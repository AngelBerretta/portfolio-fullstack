import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Sidebar } from '@/components/admin/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // El proxy.ts ya protege estas rutas, pero esta es una segunda capa
  // server-side por si el layout se renderiza fuera de ese flujo.
  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar userEmail={session.user.email ?? ''} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
