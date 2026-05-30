import { useCallback, useEffect, useRef, useState } from 'react'
import './Experience.css'

const experienceData = [
  {
    id: 'kyndryl',
    company: 'Kyndryl',
    role: 'Software Engineering Intern',
    period: 'May 2026 - July 2026',
    description: null,
    bullets: [
      'Working on a cloud-native report generation platform built using Java, Quarkus, Microservices, Azure Service Bus, Azure Cosmos DB, Redis, and OpenShift.',
      'Contributing to the design and implementation of distributed asynchronous processing, fault-tolerant report generation, and heartbeat-based liveness monitoring to improve reliability and recovery of long-running workloads.',
    ],
    tags: ['Enterprise Applications', 'Microsoft Azure'],
  },
  {
    id: 'acm',
    company: 'ACM Shiv Nadar Chapter',
    role: 'Public Relations Lead',
    period: 'May 2025 - May 2026',
    description: null,
    bullets: [
      'Spearheaded outreach strategies resulting in a 20% increase in member participation.',
      'Coordinated technical workshops and guest speaker sessions for a community of 500+ students.',
    ],
    tags: ['Public Relations', 'Community Building'],
  },
  {
    id: 'godaddy',
    company: 'GoDaddy AI Buildathon',
    role: 'Top 10 Finalist',
    period: 'April 2026',
    description:
      'Competed globally to build generative AI solutions. Recognized for innovation and technical implementation in a high-pressure development environment.',
    bullets: null,
    tags: ['Generative AI', 'Product Innovation'],
  },
]

const universityData = {
  institution: 'Shiv Nadar University',
  degree: 'B.Tech in Computer Science & Engineering',
  score: '9.30',
  scoreLabel: 'CGPA',
  honors: "4x Recipient of the Dean's List Award for Academic Excellence",
}

const schoolsData = [
  {
    id: 'resonance',
    institution: 'Resonance Junior College',
    level: 'Senior Secondary',
    score: '92.4%',
  },
  {
    id: 'dps',
    institution: 'Delhi Public School',
    level: 'Secondary Education',
    score: '91%',
  },
]

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function GraduationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Experience() {
  const timelineRef = useRef(null)
  const [lineProgress, setLineProgress] = useState(0)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [mobileExpanded, setMobileExpanded] = useState(new Set())

  const handleScroll = useCallback(() => {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const trigger = window.innerHeight * 0.55
    const progress = (trigger - rect.top) / rect.height
    setLineProgress(Math.max(0, Math.min(1, progress)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const cards = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.reveal]))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const isVisible = (id) => visibleCards.has(id)

  const toggleMobileExpanded = (id) => {
    setMobileExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className="journey-section" id="experience">
      <div className="journey-header">
        <h2 className="journey-title">
          Journey & <span className="journey-title-accent">Academics</span>
        </h2>
        <p className="journey-subtitle">A roadmap of professional growth and academic excellence.</p>
      </div>

      <h3 className="journey-col-heading">
        <span className="journey-col-icon">
          <BriefcaseIcon />
        </span>
        Experience
      </h3>

      <div className="timeline" ref={timelineRef}>
        <div className="timeline-track">
          <div className="timeline-line" style={{ height: `${lineProgress * 100}%` }} />
        </div>

        {experienceData.map((item, idx) => {
          const side = idx % 2 === 0 ? 'right' : 'left'
          const dotActive = lineProgress > idx / experienceData.length

          return (
            <div
              key={item.id}
              className={`timeline-entry timeline-entry--${side} ${
                isVisible(item.id) ? 'timeline-entry--visible' : ''
              }`}
              data-reveal={item.id}
            >
              <div className="timeline-entry-left">
                {side === 'left' && (
                  <div className="exp-card">
                    <ExpCardContent item={item} />
                  </div>
                )}
              </div>

              <div className="timeline-dot-wrapper">
                <div className={`timeline-dot ${dotActive ? 'timeline-dot--active' : ''}`} />
              </div>

              <div className="timeline-entry-right">
                {side === 'right' && (
                  <div className="exp-card">
                    <ExpCardContent item={item} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="journey-mobile-list">
        {experienceData.map((item) => {
          const expanded = mobileExpanded.has(item.id)
          const hasMore = Boolean(item.bullets && item.bullets.length > 1)
          const bullets = item.bullets || []
          const previewBullets = bullets.slice(0, 1)
          const visibleBullets = expanded ? bullets : previewBullets

          return (
            <article
              key={item.id}
              className={`exp-card exp-card--mobile ${expanded ? 'exp-card--expanded' : ''}`}
              data-reveal={`${item.id}-mobile`}
            >
              <div className="exp-card-header exp-card-header--mobile">
                <div>
                  <h4 className="exp-card-company">{item.company}</h4>
                  <span className="exp-card-role">{item.role}</span>
                </div>
                <span className="exp-card-period">{item.period}</span>
              </div>

              {item.description && <p className="exp-card-desc">{item.description}</p>}

              {visibleBullets.length > 0 && (
                <ul className="exp-card-bullets exp-card-bullets--mobile">
                  {visibleBullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}

              <div className="exp-card-mobile-footer">
                {item.tags && (
                  <div className="exp-card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="exp-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {hasMore && (
                  <button
                    type="button"
                    className="exp-card-more"
                    onClick={() => toggleMobileExpanded(item.id)}
                    aria-expanded={expanded}
                    aria-label={expanded ? `Collapse ${item.company}` : `Expand ${item.company}`}
                  >
                    <ChevronDownIcon />
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <h3 className="journey-col-heading journey-col-heading--edu">
        <span className="journey-col-icon">
          <GraduationIcon />
        </span>
        Education
      </h3>

      <div className="edu-grid">
        <div
          className={`edu-card edu-card--university ${isVisible('snu') ? 'edu-card--visible' : ''}`}
          data-reveal="snu"
        >
          <h4 className="edu-card-name">{universityData.institution}</h4>
          <p className="edu-card-degree">{universityData.degree}</p>

          <div className="edu-score-block">
            <span className="edu-score">{universityData.score}</span>
            <span className="edu-score-label">{universityData.scoreLabel}</span>
          </div>

          <div className="edu-honors">
            <span className="edu-honors-icon">
              <AwardIcon />
            </span>
            <div>
              <span className="edu-honors-label">Honors & Awards</span>
              <p className="edu-honors-text">{universityData.honors}</p>
            </div>
          </div>
        </div>

        {schoolsData.map((school) => (
          <div
            key={school.id}
            className={`edu-card edu-card--school ${isVisible(school.id) ? 'edu-card--visible' : ''}`}
            data-reveal={school.id}
          >
            <h4 className="edu-school-name">{school.institution}</h4>
            <span className="edu-school-level">{school.level}</span>
            <span className="edu-school-score">{school.score}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ExpCardContent({ item }) {
  return (
    <>
      <div className="exp-card-header">
        <div>
          <h4 className="exp-card-company">{item.company}</h4>
          <span className="exp-card-role">{item.role}</span>
        </div>
        <span className="exp-card-period">{item.period}</span>
      </div>

      {item.description && <p className="exp-card-desc">{item.description}</p>}

      {item.bullets && (
        <ul className="exp-card-bullets">
          {item.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}

      {item.tags && (
        <div className="exp-card-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="exp-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  )
}
