import { useState, useRef, useEffect } from 'react'
import './TechStack.css'

const techItems = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
]

export default function TechStack() {
  const [expanded, setExpanded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const sectionRef = useRef(null)

  /* Auto-close expanded grid when scrolling away */
  useEffect(() => {
    if (!expanded) return

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [expanded])

  return (
    <section className="tech-section" id="techstack" ref={sectionRef}>
      {/* Heading — clickable to toggle */}
      <button
        type="button"
        className="tech-heading-btn"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <h2 className="tech-heading">
          My Tech Stack
          <span className={`tech-chevron ${expanded ? 'tech-chevron--open' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </h2>
        <p className="tech-subtitle">
          Specialized tools and frameworks for high-performance computing.
        </p>
      </button>

      {/* Carousel — visible when NOT expanded */}
      <div className={`carousel-wrapper ${expanded ? 'carousel-wrapper--hidden' : ''}`}>
        {/* gradient masks */}
        <div className="carousel-fade carousel-fade--left" />
        <div className="carousel-fade carousel-fade--right" />

        <div
          className="carousel-track"
          aria-label="Tech stack carousel"
        >
          {/* Duplicate items for seamless infinite scroll */}
          {[...techItems, ...techItems].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="carousel-item"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={tech.icon} alt={tech.name} className="carousel-icon" loading="lazy" />
              <span className={`carousel-tooltip ${hoveredIndex === i ? 'carousel-tooltip--visible' : ''}`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded grid — visible when expanded */}
      <div className={`tech-grid-wrapper ${expanded ? 'tech-grid-wrapper--visible' : ''}`}>
        <div className="tech-grid">
          {techItems.map((tech) => (
            <div key={tech.name} className="tech-card">
              <img src={tech.icon} alt={tech.name} className="tech-card-icon" loading="lazy" />
              <span className="tech-card-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
