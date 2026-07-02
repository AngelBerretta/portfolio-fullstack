import { useEffect, useState } from 'react';

export function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => {
        setText(word.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2.5);
    } else {
      // Transición inmediata a la siguiente palabra. La envolvemos en un
      // setTimeout(0) para no llamar setState de forma sincrónica dentro
      // del efecto — el comportamiento visual es idéntico.
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}