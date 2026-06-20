'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { ImagePlus, Loader2, X, AlertCircle } from 'lucide-react';
import { deleteBlobImage } from '@/actions/upload';

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ImageUploader({
  name,
  initialUrl,
  folder,
  aspectRatio = 'aspect-video',
}: {
  /** Nombre del input hidden — así FormData.get(name) trae la URL final */
  name: string;
  initialUrl?: string | null;
  /** Subcarpeta dentro del Blob store, ej: "projects" o "profile" */
  folder: string;
  /** Clase de Tailwind para la proporción del preview, ej: "aspect-square" */
  aspectRatio?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Formato no soportado. Usá JPG, PNG o WebP.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`La imagen no puede superar ${MAX_SIZE_MB}MB.`);
      return;
    }

    const previousUrl = url;
    setIsUploading(true);
    setProgress(0);

    try {
      const newBlob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
      });

      setUrl(newBlob.url);

      // Borramos la imagen anterior en segundo plano — no bloqueamos la UI
      // esperando esto, y si falla no afecta el formulario.
      if (previousUrl && previousUrl !== newBlob.url) {
        void deleteBlobImage(previousUrl);
      }
    } catch (err) {
      console.error(err);
      setError('Error al subir la imagen. Intentá de nuevo.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    if (url) void deleteBlobImage(url);
    setUrl('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="space-y-2">
      {/* Esto es lo que el formulario realmente envía */}
      <input type="hidden" name={name} value={url} />

      <div
        className={`relative ${aspectRatio} w-full max-w-sm rounded-lg overflow-hidden border border-gray-700 bg-gray-800 group`}
      >
        {url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
              aria-label="Quitar imagen"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm gap-2">
            <ImagePlus className="w-6 h-6" />
            Sin imagen
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 text-white text-sm">
            <Loader2 className="w-5 h-5 animate-spin" />
            Subiendo... {progress}%
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        disabled={isUploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="block text-sm text-gray-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-gray-800 file:text-gray-300 file:text-sm hover:file:bg-gray-700 file:cursor-pointer cursor-pointer disabled:opacity-50"
      />

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
      <p className="text-xs text-gray-600">JPG, PNG o WebP — máx {MAX_SIZE_MB}MB.</p>
    </div>
  );
}
