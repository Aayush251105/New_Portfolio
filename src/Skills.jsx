import { useState, useEffect, useRef } from 'react'
import './Skills.css'

/* ─────────────────────────────────────────────
 *  SKILLS DATA
 *  Each category becomes a card in the bento grid.
 *  Add / remove items freely.
 * ───────────────────────────────────────────── */
const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'code',
    span: 1,
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    span: 1,
    items: ['HTML', 'CSS', 'React.js', 'Next.js'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'server',
    span: 1,
    items: ['Node.js', 'Express.js', 'EJS', 'REST APIs'],
  },
  {
    id: 'data',
    title: 'Data & Databases',
    icon: 'database',
    span: 1,
    items: ['MySQL', 'MongoDB', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: 'wrench',
    span: 1,
    items: ['Git', 'GitHub', 'Postman', 'Vercel', 'Render'],
  },
  {
    id: 'aiml',
    title: 'AI / ML Foundations',
    icon: 'brain',
    span: 1,
    items: [
      'Linear Regression',
      'Logistic Regression',
      'Perceptron',
      'K-Means',
      'PCA',
      'Neural Networks (MLP)',
    ],
  },
]

/* ─────────────────────────────────────────────
 *  CERTIFICATIONS DATA
 * ───────────────────────────────────────────── */
const certifications = [
  {
    id: 'google-ai',
    title: 'Google AI Essentials',
    issuer: 'Google / Coursera',
    badge: 'Verified',
    color: '#4285F4',
    link: null,
  },
  {
    id: 'python-bootcamp',
    title: 'The Complete Python Bootcamp',
    issuer: 'Udemy',
    badge: 'Completed',
    color: '#A435F0',
    link: null,
  },
  {
    id: 'dsa-sigma',
    title: 'DSA – Sigma 7.0',
    issuer: 'Apna College',
    badge: 'Completed',
    color: '#00C853',
    link: null,
  },
]

/* ── Icon map ── */
function CategoryIcon({ type }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (type) {
    case 'code':
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'layout':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      )
    case 'server':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    case 'database':
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      )
    case 'wrench':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'brain':
      return (
        <svg {...props}>
          <path d="M9.5 2A5.5 5.5 0 0 0 5 5.5c0 .17.01.34.03.5A4 4 0 0 0 1 10a4 4 0 0 0 3.03 3.88A5.5 5.5 0 0 0 9.5 18h0" />
          <path d="M14.5 2A5.5 5.5 0 0 1 19 5.5c0 .17-.01.34-.03.5A4 4 0 0 1 23 10a4 4 0 0 1-3.03 3.88A5.5 5.5 0 0 1 14.5 18h0" />
          <line x1="12" y1="2" x2="12" y2="18" />
        </svg>
      )
    default:
      return null
  }
}

function CertIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function Skills() {
  const [visibleCards, setVisibleCards] = useState(new Set())
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = document.querySelectorAll('[data-skill-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.skillReveal]))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    )
    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  const isVisible = (id) => visibleCards.has(id)

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      {/* ── Header ── */}
      <div className="skills-header">
        <span className="skills-eyebrow">Aayush Gupta</span>
        <h2 className="skills-title">
          Skills & <span className="skills-title-accent">Certifications</span>
        </h2>
        <p className="skills-subtitle">
          A technical ecosystem for high-performance AI integration and full-stack software development.
        </p>
      </div>

      {/* ── Skills bento grid ── */}
      <div className="skills-grid">
        {skillCategories.map((cat, idx) => (
          <div
            key={cat.id}
            className={`skill-card ${isVisible(cat.id) ? 'skill-card--visible' : ''}`}
            data-skill-reveal={cat.id}
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <div className="skill-card-header">
              <span className="skill-card-icon">
                <CategoryIcon type={cat.icon} />
              </span>
              <h3 className="skill-card-title">{cat.title}</h3>
            </div>

            <div className="skill-chips">
              {cat.items.map((item) => (
                <span key={item} className="skill-chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Certifications ── */}
      <div className="certs-header">
        <h3 className="certs-title">Professional Certifications</h3>
      </div>

      <div className="certs-grid">
        {certifications.map((cert, idx) => (
          <div
            key={cert.id}
            className={`cert-card ${isVisible(cert.id) ? 'cert-card--visible' : ''}`}
            data-skill-reveal={cert.id}
            style={{ transitionDelay: `${idx * 100 + 300}ms` }}
          >
            {/* Gradient banner */}
            <div
              className="cert-card-banner"
              style={{
                background: `linear-gradient(135deg, ${cert.color}22, ${cert.color}08), var(--surface)`,
              }}
            >
              <div className="cert-card-emblem" style={{ borderColor: `${cert.color}44` }}>
                <CertIcon color={cert.color} />
              </div>
            </div>

            {/* Body */}
            <div className="cert-card-body">
              <div className="cert-card-badge-row">
                <span className="cert-badge" style={{ color: cert.color, borderColor: `${cert.color}33` }}>
                  {cert.badge}
                </span>
              </div>
              <h4 className="cert-card-name">{cert.title}</h4>
              <span className="cert-card-issuer">{cert.issuer}</span>

              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card-link">
                  View Credential <ExternalIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
