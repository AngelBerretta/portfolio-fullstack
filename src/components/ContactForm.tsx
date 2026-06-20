"use client";

// ContactForm.tsx — formulario de contacto con EmailJS
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── Reemplazá estos valores con los tuyos de EmailJS ────────────────────────
const EMAILJS_SERVICE_ID  = 'service_r5k2x8i';
const EMAILJS_TEMPLATE_ID = 'template_ru7g3ot';
const EMAILJS_PUBLIC_KEY  = 'QSHBOoWheHH5nM1Ns';
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/5 transition-all duration-300 [background:var(--bg-card)] [border-color:var(--border-subtle)] [color:var(--text-primary)] placeholder:[color:var(--text-muted)]';

export function ContactForm({ isInView }: { isInView: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject || 'Contacto desde Portfolio',
          message:      form.message,
          to_email:     'angelcursodeingles2@gmail.com',
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="p-7 rounded-2xl border [background:var(--bg-card)] [border-color:var(--border-subtle)]"
    >
      <h3 className="font-bold text-lg mb-6 [color:var(--text-primary)]">Enviame un mensaje</h3>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Tu nombre"
              required
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="tu@email.com"
              required
              disabled={status === 'loading'}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Asunto</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
            placeholder="¿De qué se trata?"
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-2 [color:var(--text-muted)]">Mensaje</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Contame tu proyecto o propuesta..."
            required
            disabled={status === 'loading'}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg disabled:cursor-not-allowed ${
            status === 'success'
              ? 'bg-green-500 text-white shadow-green-500/25'
              : status === 'error'
              ? 'bg-red-500/80 text-white shadow-red-500/25'
              : status === 'loading'
              ? 'bg-blue-500/50 text-white'
              : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-[1.02]'
          }`}
        >
          {status === 'loading' && <><Loader2 size={16} className="animate-spin" /> Enviando...</>}
          {status === 'success' && <><CheckCircle size={18} /> ¡Mensaje enviado!</>}
          {status === 'error'   && <><AlertCircle size={16} /> Error al enviar. Intentá de nuevo</>}
          {status === 'idle'    && <><Send size={16} /> Enviar mensaje</>}
        </button>

        <p className="text-xs text-center [color:var(--text-muted)]">
          El mensaje llega directo a mi Gmail.
        </p>
      </form>
    </motion.div>
  );
}
