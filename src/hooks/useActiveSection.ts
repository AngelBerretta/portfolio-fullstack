import { useState, useEffect, useRef } from 'react'

// Mismo orden que en tu Navbar y SideNav
const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const visibleSections = useRef<Set<SectionId>>(new Set(['hero']))

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.current.add(sectionId)
            } else {
              visibleSections.current.delete(sectionId)
            }
          })

          // De las secciones visibles, tomamos la primera en el orden del DOM
          const firstVisible = SECTIONS.find((id) =>
            visibleSections.current.has(id)
          )
          if (firstVisible) {
            setActiveSection(firstVisible)
          }
        },
        {
          // threshold:0.2 relativo al alto propio de cada sección rompe con
          // secciones muy largas (ej. #projects, con grid + upcoming +
          // footer): el 20% de su altura puede superar el área visible del
          // viewport, y el ratio nunca llega a cumplirse — la sección nunca
          // se marca "intersecting" sin importar cuánto scroll hagas.
          //
          // Fix: colapsar el viewport a una línea central (-50% arriba y
          // -50% abajo) y threshold:0 — la sección se activa en el momento
          // exacto en que esa línea la cruza, sin depender de su alto.
          // Es la técnica estándar de scrollspy y funciona igual de bien
          // para secciones de 400px que de 4000px.
          threshold: 0,
          rootMargin: '-50% 0px -50% 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return activeSection
}