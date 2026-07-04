"use client";

import { useScrollContext, type ScrollContextValue } from '@/context/ScrollContext';

export type ScrollState = ScrollContextValue;

/**
 * @deprecated Preferir useScrollContext() directamente en código nuevo.
 *
 * Este hook antes creaba su propio listener de "scroll" + su propio rAF
 * en CADA componente que lo llamaba (Navbar, SideNav, BackToTop,
 * ScrollProgress usaban 4 instancias independientes). Ahora es solo un
 * wrapper sobre ScrollProvider: un único listener compartido para toda
 * la app. Se mantiene con la misma firma para no tener que tocar los
 * componentes que ya lo consumen.
 */
export function useScrollState(): ScrollState {
  return useScrollContext();
}