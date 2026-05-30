import { useCallback, useEffect, useRef, useState } from 'react'
import avatarImage from './assets/peeps-avatar-alpha (1).png'
import TechStack from './TechStack'
import Projects from './Projects'
import Experience from './Experience'
import Skills from './Skills'
import Contact, { Footer } from './Contact'
import './App.css'

const navLinks = ['Home', 'Projects', 'Experience', 'Skills', 'Contact']
const sectionIds = navLinks.map((link) => link.toLowerCase())

const stats = [
  { value: '9.30', label: 'Current GPA' },
  { value: 'Kyndryl', label: 'Intern' },
  { value: '8+', label: 'Projects' },
]

function App() {
  const [themeMode, setThemeMode] = useState('dark')
  const [activeSection, setActiveSection] = useState('home')
  const [navHidden, setNavHidden] = useState(false)
  const [navRevealing, setNavRevealing] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const lastScrollY = useRef(0)
  const revealTimeout = useRef(null)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeMode(storedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setThemeMode(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
    window.localStorage.setItem('portfolio-theme', themeMode)
  }, [themeMode])

  useEffect(() => {
    const observers = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0,
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) {
        setMobileNavOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    const scrollingDown = currentY > lastScrollY.current
    const pastThreshold = currentY > 100

    setNavHidden(scrollingDown && pastThreshold)

    if (mobileNavOpen) {
      setMobileNavOpen(false)
    }

    if (!scrollingDown && navHidden) {
      setNavRevealing(true)
      window.clearTimeout(revealTimeout.current)
      revealTimeout.current = window.setTimeout(() => {
        setNavRevealing(false)
      }, 320)
    }

    lastScrollY.current = currentY
  }, [mobileNavOpen, navHidden])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(revealTimeout.current)
    }
  }, [handleScroll])

  return (
    <div className="page-shell">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <header
        className={`topbar ${navHidden ? 'topbar--hidden' : ''} ${
          navRevealing ? 'topbar--revealing' : ''
        }`}
      >
        <a className="brand" href="#home">
          Aayush Gupta
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMobileNavOpen((open) => !open)}
          aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileNavOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${mobileNavOpen ? 'nav--open' : ''}`}>
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              onClick={() => setMobileNavOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
          </button>

          <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </header>

      <main className="hero-stage" id="home">
        <section className="hero-copy">
          <span className="eyebrow">Available for hire</span>
          <h1>
            Aayush <span>Gupta</span>
          </h1>
          <p className="hero-text">
            Building intelligent systems powered by AI, for real-world applications.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View My Work
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button button-secondary" href="#contact">
              Contact Me
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="hero-panel">
          <div className="avatar-shell">
            <div className="avatar-backdrop" />
            <div className="avatar-ring avatar-ring-one" />
            <div className="avatar-ring avatar-ring-two" />
            <img className="hero-avatar" src={avatarImage} alt="Illustrated avatar portrait" />
          </div>
        </aside>
      </main>

      <TechStack />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
