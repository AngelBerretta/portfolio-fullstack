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
          // Se activa cuando al menos el 20% de la sección es visible
          threshold: 0.2,
          // Recorte del viewport: ignoramos el 10% superior e inferior
          // para que el cambio no sea brusco
          rootMargin: '-10% 0px -10% 0px',
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