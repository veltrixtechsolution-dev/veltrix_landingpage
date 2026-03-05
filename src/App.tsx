import { useEffect } from 'react'
import '../styles.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ServiceMarquee } from './components/ServiceMarquee'
import { AboutSection } from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection'
import { ProcessSection } from './components/ProcessSection'
import { CtaSection } from './components/CtaSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

function App() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.nav')
    const hero = document.getElementById('hero')

    if (!nav || !hero) return

    const handleScroll = () => {
      const trigger = hero.offsetHeight * 0.15
      if (window.scrollY > trigger) {
        nav.classList.add('nav--scrolled')
      } else {
        nav.classList.remove('nav--scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')

    let observer: IntersectionObserver | null = null

    if (revealEls.length) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible')
              observer?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.18 }
      )

      revealEls.forEach((el) => observer!.observe(el))
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return

      const href = link.getAttribute('href') || ''
      if (href.length <= 1) return

      const section = document.querySelector<HTMLElement>(href)
      if (!section) return

      event.preventDefault()
      const rect = section.getBoundingClientRect()
      const offset = window.scrollY + rect.top - 96

      window.scrollTo({ top: offset, behavior: 'smooth' })
    }

    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      observer?.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceMarquee />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <CtaSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
