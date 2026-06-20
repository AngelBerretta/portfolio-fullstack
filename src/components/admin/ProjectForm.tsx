'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TagSelector } from './TagSelector';
import { SubmitButton } from './SubmitButton';
import { ImageUploader } from './ImageUploader';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, slugify } from '@/lib/constants';
import type { ActionResult } from '@/lib/action-types';
import type { Project, Tag } from '@prisma/client';

type ProjectWithTags = Project & { tags: Tag[] };

export function ProjectForm({
  project,
  allTags,
  action,
}: {
  project?: ProjectWithTags;
  allTags: string[];
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<any>;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, null);

  const [title, setTitle] = useState(project?.title ?? '');
  const [slug, setSlug] = useState(project?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!project); // si edita, no auto-generar
  const [category, setCategory] = useState(project?.category ?? 'frontend');
  const [status, setStatus] = useState(project?.status ?? '');
  const [featured, setFeatured] = useState(project?.featured ?? false);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/projects');
    }
  }, [state, router]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  const fieldErrors = state?.success === false ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-6">
      {state?.success === false && state.error && (
        <p className="text-sm text-red-400 bg-red-950/50 px-4 py-3 rounded-lg border border-red-900">
          {state.error}
        </p>
      )}

      {/* Título + slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Título" error={fieldErrors?.title?.[0]}>
          <input
            name="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={inputClass}
            placeholder="Fire Market"
          />
        </Field>

        <Field
          label="Slug"
          hint="Se usa en la URL. Solo minúsculas, números y guiones."
          error={fieldErrors?.slug?.[0]}
        >
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            required
            pattern="[a-z0-9-]+"
            className={inputClass}
            placeholder="fire-market"
          />
        </Field>
      </div>

      {/* Descripción */}
      <Field label="Descripción" error={fieldErrors?.description?.[0]}>
        <textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={4}
          className={inputClass}
          placeholder="Contá de qué se trata el proyecto, qué problema resuelve y qué tecnologías usaste..."
        />
      </Field>

      {/* Imagen */}
      <Field label="Imagen del proyecto" error={fieldErrors?.imageUrl?.[0]}>
        <ImageUploader name="imageUrl" initialUrl={project?.imageUrl} folder="projects" aspectRatio="aspect-video" />
      </Field>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="URL del código (GitHub)" error={fieldErrors?.codeUrl?.[0]}>
          <input
            name="codeUrl"
            defaultValue={project?.codeUrl}
            required
            className={inputClass}
            placeholder="https://github.com/usuario/repo"
          />
        </Field>

        <Field label="URL de la demo" hint="Usá # si todavía no tiene demo pública." error={fieldErrors?.demoUrl?.[0]}>
          <input
            name="demoUrl"
            defaultValue={project?.demoUrl}
            required
            className={inputClass}
            placeholder="https://mi-proyecto.vercel.app"
          />
        </Field>
      </div>

      {/* Categoría + estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Categoría" error={fieldErrors?.category?.[0]}>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Estado" hint="Dejalo en blanco si el proyecto ya está terminado y live.">
          <select
            name="status"
            value={status ?? ''}
            onChange={(e) => setStatus(e.target.value)}
            className={inputClass}
          >
            {PROJECT_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {status && (
        <Field label="Texto del badge de estado" error={fieldErrors?.statusLabel?.[0]}>
          <input
            name="statusLabel"
            defaultValue={project?.statusLabel ?? (status === 'in-progress' ? 'En construcción' : 'Próximamente')}
            className={inputClass}
            placeholder="En construcción"
          />
        </Field>
      )}

      {/* Tags */}
      <Field
        label="Tecnologías (tags)"
        hint="Presioná Enter para agregar. Si el tag no existe, se crea automáticamente."
        error={fieldErrors?.tags?.[0]}
      >
        <TagSelector
          name="tags"
          allTags={allTags}
          initialTags={project?.tags.map((t) => t.name) ?? []}
        />
      </Field>

      {/* Featured + orden */}
      <div className="flex items-center gap-8">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
          />
          {/* checkbox real envía "on"/"off" — normalizamos a true/false explícito */}
          <input type="hidden" name="featured" value={featured ? 'true' : 'false'} />
          <span className="text-sm text-gray-300">Destacado en la home</span>
        </label>

        <Field label="Orden" hint="Menor número aparece primero.">
          <input
            name="order"
            type="number"
            defaultValue={project?.order ?? 0}
            className={`${inputClass} w-24`}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>{project ? 'Guardar cambios' : 'Crear proyecto'}</SubmitButton>
        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ─── Sub-componentes de UI ────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
