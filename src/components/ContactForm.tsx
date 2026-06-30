// ContactForm.tsx — textarea con altura fija cómoda, sin flex-1
"use client";
import { useActionState, useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '@/actions/contact';

const inputClass =
  'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/5 transition-all duration-300 [background:var(--bg-card)] [border-color:var(--border-subtle)] [color:var(--text-primary)] placeholder:[color:var(--text-muted)]';

export function ContactForm({ isInView }: { isInView: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendContactMessage, null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!state) return;
    setShowResult(true);
    if (state.success) formRef.current?.reset();
    const timeout = setTimeout(() => setShowResult(false), 5000);
    return () => clearTimeout(timeout);
  }, [state]);

  const fieldErrors = state?.success === false ? state.fieldErrors : undefined;
  const showSuccess = showResult && state?.success === true;
  const showError = showResult && state?.success === false;

  return (
    <m.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="p-7 rounded-2xl border [background:var(--bg-card)] [border-color:var(--border-subtle)]"
    >
      <h3 className="font-bold text-lg mb-6 [color:var(--text-primary)]">Enviame un mensaje</h3>

      <form ref={formRef} action={formAction} className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Nombre</label>
            <input
              name="name"
              className={inputClass}
              placeholder="Tu nombre"
              required
              disabled={isPending}
            />
            {fieldErrors?.name?.[0] && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Email</label>
            <input
              type="email"
              name="email"
              className={inputClass}
              placeholder="tu@email.com"
              required
              disabled={isPending}
            />
            {fieldErrors?.email?.[0] && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Asunto</label>
          <input
            name="subject"
            className={inputClass}
            placeholder="¿De qué se trata?"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Mensaje</label>
          {/* ── altura fija cómoda: ni muy chico ni exagerado ── */}
          <textarea
            name="message"
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Contame tu proyecto o propuesta..."
            required
            disabled={isPending}
          />
          {fieldErrors?.message?.[0] && (
            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.message[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || showSuccess}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg disabled:cursor-not-allowed ${
            showSuccess
              ? 'bg-green-500 text-white shadow-green-500/25'
              : showError
              ? 'bg-red-500/80 text-white shadow-red-500/25'
              : isPending
              ? 'bg-blue-500/50 text-white'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25 hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:scale-[1.02]'
          }`}
        >
          {isPending && <><Loader2 size={16} className="animate-spin" /> Enviando...</>}
          {!isPending && showSuccess && <><CheckCircle size={18} /> ¡Mensaje enviado!</>}
          {!isPending && showError && (
            <><AlertCircle size={16} />{state && !state.success ? state.error : 'Error al enviar'}</>
          )}
          {!isPending && !showSuccess && !showError && <><Send size={16} /> Enviar mensaje</>}
        </button>

        <p className="text-xs text-center [color:var(--text-muted)]">
          El mensaje llega directo a mi Gmail.
        </p>
      </form>
    </m.div>
  );
}