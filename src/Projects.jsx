import { useState, useMemo, useEffect, useRef } from 'react'
import './Projects.css'

/* ─────────────────────────────────────────────
 *  PROJECT DATA
 *  ─ image  : path relative to /public (e.g. "/projects/my-app.png")
 *  ─ span   : 1 = normal card, 2 = wide card (occupies 2 grid columns)
 *  ─ github : GitHub repo URL  (required)
 *  ─ live   : live deployment URL (optional, set null if none)
 *  ─ badge  : optional label shown on the image (e.g. "Live Beta")
 *
 *  To add a new project:
 *    1. drop the screenshot into  public/projects/
 *    2. add a new object below
 * ───────────────────────────────────────────── */
const projects = [
  {
    id: 'vidtube-ai',
    title: 'VidTube-AI',
    description:
      'AI-powered SaaS platform enabling users to upload, manage, and transform media content using Cloudinary\'s AI APIs with automated video compression and intelligent previews.',
    tags: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Cloudinary'],
    category: ['AI / ML', 'Full Stack'],
    image: '/projects/VidTube 3.png',
    span: 2,
    github: 'https://github.com/Aayush251105/VidTube-AI.git',
    live: 'https://vid-tube-ai.vercel.app/',
    badge: null,
  },
  {
    id: 'booknow',
    title: 'BookNow',
    description:
      'Full-stack property booking platform with MVC architecture featuring browsing, filtering, interactive maps, and secure authentication.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Mapbox'],
    category: ['Full Stack'],
    image: '/projects/BookNow 1.png',
    span: 1,
    github: 'https://github.com/Aayush251105/BookNow_Project.git',
    live: 'https://booknow-s4kr.onrender.com/',
    badge: null,
  },
  {
    id: 'questflow',
    title: 'Questflow',
    description:
      'Full-stack Q&A platform inspired by Stack Overflow with reputation systems, custom dashboards, and community-driven engagement.',
    tags: ['Next.js', 'React', 'TypeScript', 'Appwrite'],
    category: ['Full Stack'],
    image: '/projects/Questflow 1.png',
    span: 1,
    github: 'https://github.com/Aayush251105/Proj-QuestFlow.git',
    live: null,
    badge: null,
  },
  {
    id: 'hirelens-ai',
    title: 'HireLens AI',
    description:
      'Deep-learning talent assessment tool for high-volume technical recruitment with AI-driven candidate evaluation and automated resume screening.',
    tags: ['React', 'Python', 'FastAPI', 'TiDB'],
    category: ['AI / ML', 'Full Stack'],
    image: '/projects/HireLens 1.png',
    span: 2,
    github: 'https://github.com/Aayush251105/HireLens-AI.git',
    live: 'https://hirelens-ai-q1fa.onrender.com',
    badge: null,
  },
  {
    id: 'virtual-tryon',
    title: 'Virtual Try-On',
    description:
      'AI-powered virtual clothing try-on application using computer vision models for realistic garment visualization.',
    tags: ['React', 'Python', 'FastAPI'],
    category: ['AI / ML', 'Full Stack'],
    image: '/projects/VirtualTryOn.png',
    span: 2,
    github: 'https://github.com/Aayush251105/VirtualTryOn.git',
    live: null,
    badge: null,
  },
  {
    id: 'fitrack',
    title: 'FiTrack',
    description:
      'Comprehensive personal finance tracker with automated expense categorization and visual budget analytics.',
    tags: ['React', 'Firebase', 'Chart.js'],
    category: ['Full Stack'],
    image: '/projects/fiTrack 1.png',
    span: 1,
    github: 'https://github.com/Aayush251105/FiTrack.git',
    live: null,
    badge: null,
  },
  {
    id: 'spellchecker',
    title: 'NLP Spellchecker',
    description:
    'Intelligent spellchecker using NLP techniques with multi-category evaluation and mutation-based testing.',
    tags: ['Python', 'NLP', 'NumPy'],
    category: ['AI / ML'],
    image: '/projects/SpellChecker.png',
    span: 1,
    github: 'https://github.com/Aayush251105/SpellCorrectionSystem_NLP.git',
    live: null,
    badge: null,
  },
  {
    id: 'arts',
    title: 'ARTS',
    description:
      'Airline reservation and ticketing system with comprehensive flight search, booking flow, and seat management.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    category: ['Full Stack'],
    image: '/projects/ARTS.png',
    span: 2,
    github: 'https://github.com/Aayush251105/ARTS_Proj.git',
    live: null,
    badge: null,
  },
]

const CATEGORIES = ['All Works', 'AI / ML', 'Full Stack']
const INITIAL_VISIBLE = 4

/* ── Icon components ── */

function ChevronDown({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/* ── Main component ── */

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All Works')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const gridRef = useRef(null)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === 'All Works' || p.category.includes(activeCategory)
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hasMore = filtered.length > INITIAL_VISIBLE

  /* ── Scroll-reveal observer ── */
  useEffect(() => {
    const cards = document.querySelectorAll('[data-project-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.projectReveal]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [visible])

  return (
    <section className="projects-section" id="projects">
      {/* Header */}
      <div className="projects-header">
        <h2 className="projects-title"> 
          Engineering <span className="projects-title-accent">Intelligent,</span>
          <br />
          <span className="projects-title-accent">Scalable</span> Systems
        </h2>
        <p className="projects-subtitle">
          A selection of projects showcasing AI-powered applications, full-stack systems, and real-world problem solving.
        </p>
      </div>

      {/* Toolbar */}
      <div className="projects-toolbar">
        <div className="projects-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${activeCategory === cat ? 'filter-chip--active' : ''}`}
              onClick={() => { setActiveCategory(cat); setShowAll(false) }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-search-wrapper">
          <svg className="projects-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="projects-search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowAll(false) }}
          />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="projects-grid" ref={gridRef}>
        {visible.map((project, idx) => (
          <article
            key={project.id}
            className={`project-card ${project.span === 2 ? 'project-card--wide' : ''} ${!project.image ? 'project-card--no-image' : ''} ${visibleCards.has(project.id) ? 'project-card--visible' : ''}`}
            data-project-reveal={project.id}
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            {/* Visual area */}
            {project.image ? (
              <div className="project-card-visual">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="project-card-img"
                  loading="lazy"
                />
                {project.badge && <span className="project-badge">{project.badge}</span>}
              </div>
            ) : (
              <div className="project-card-visual project-card-visual--gradient">
                {project.badge && <span className="project-badge">{project.badge}</span>}
              </div>
            )}

            {/* Content */}
            <div className="project-card-body">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-footer">
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-card-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`${project.title} GitHub`}>
                      <GithubIcon />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`${project.title} Live Demo`}>
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Show more / less */}
      {hasMore && (
        <button
          type="button"
          className="projects-expand-btn"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
        >
          <span>{showAll ? 'Show Less' : 'View All Projects'}</span>
          <ChevronDown className={`projects-expand-chevron ${showAll ? 'projects-expand-chevron--open' : ''}`} />
        </button>
      )}
    </section>
  )
}
