import { useState, useEffect, useRef } from 'react'

interface ScrollState {
  scrollY: number
  scrollProgress: number
  isScrolled: boolean
  showBackToTop: boolean
  isSideNavVisible: boolean
}

export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
    showBackToTop: false,
    isSideNavVisible: false,
  })

  const rafRef = useRef<number | null>(null)
  const latestScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      latestScrollY.current = window.scrollY

      // Si ya hay un frame pendiente, no agendamos otro
      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = latestScrollY.current
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress =
          docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0

        setState({
          scrollY,
          scrollProgress,
          isScrolled: scrollY > 40,        // mismo umbral que tenías en Navbar
          showBackToTop: scrollY > 500,    // mismo umbral que tenías en BackToTop
          isSideNavVisible: scrollY > 200, // mismo umbral que tenías en SideNav
        })

        rafRef.current = null
      })
    }

    // Ejecutamos una vez al montar para el estado inicial
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return state
}