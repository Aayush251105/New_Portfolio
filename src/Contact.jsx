import { useState, useEffect } from 'react'
import './Contact.css'

/* ─────────────────────────────────────────────
 *  DATA — update links / info here
 * ───────────────────────────────────────────── */
const contactInfo = {
  email: 'aayushgupta054@gmail.com',
  location: 'Financial District, Hyderabad',
}

const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/aayushgupta' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/aayushgupta' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/aayushgupta' },
  { id: 'devto', label: 'Dev.to', url: 'https://dev.to/aayushgupta' },
]

/* ── Icons ── */
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('contact')
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi, I'm ${form.name} (${form.email}).\n\n${form.message}`)}`
    window.open(mailto, '_blank')
  }

  return (
    <section className={`contact-section ${visible ? 'contact-section--visible' : ''}`} id="contact">
      {/* Decorative orbs */}
      <div className="contact-orb contact-orb--1" />
      <div className="contact-orb contact-orb--2" />

      {/* Header */}
      <div className="contact-header">
        <span className="contact-status">
          <span className="contact-status-dot" />
          Open to Opportunities
        </span>
        <h2 className="contact-title">
          Let's Build<br />
          <span className="contact-title-accent">Something Great</span>
        </h2>
        <p className="contact-subtitle">
          Whether you have a project in mind, want to discuss the latest in AI, or just want to say hello — my inbox is always open.
        </p>
      </div>

      {/* Glowing form card */}
      <div className="contact-card-glow">
        <div className="contact-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-duo">
              <div className="form-field">
                <input
                  id="c-name"
                  className="form-input"
                  name="name"
                  type="text"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <label className="form-float-label" htmlFor="c-name">Your Name</label>
              </div>
              <div className="form-field">
                <input
                  id="c-email"
                  className="form-input"
                  name="email"
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                <label className="form-float-label" htmlFor="c-email">Email Address</label>
              </div>
            </div>

            <div className="form-field">
              <input
                id="c-subject"
                className="form-input"
                name="subject"
                type="text"
                placeholder=" "
                value={form.subject}
                onChange={handleChange}
              />
              <label className="form-float-label" htmlFor="c-subject">Subject</label>
            </div>

            <div className="form-field">
              <textarea
                id="c-message"
                className="form-input form-textarea"
                name="message"
                placeholder=" "
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
              <label className="form-float-label" htmlFor="c-message">Your Message</label>
            </div>

            <button type="submit" className="form-submit">
              <span>Send Message</span>
              <SendIcon />
            </button>
          </form>
        </div>
      </div>

      {/* Quick-connect pills */}
      <div className="contact-pills">
        <a href={`mailto:${contactInfo.email}`} className="contact-pill">
          <span className="contact-pill-icon">✉</span>
          {contactInfo.email}
        </a>
        <span className="contact-pill contact-pill--muted">
          <span className="contact-pill-icon">📍</span>
          {contactInfo.location}
        </span>
      </div>

      {/* Social strip */}
      <div className="contact-socials">
        {socialLinks.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social-link">
            {s.label}
            <ArrowIcon />
          </a>
        ))}
      </div>
    </section>
  )
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">Aayush Gupta</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Aayush Gupta &nbsp;|&nbsp; Engineered for Intelligence
        </span>
        <div className="footer-links">
          <a href="https://github.com/aayushgupta" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/aayushgupta" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://instagram.com/aayushgupta" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${contactInfo.email}`}>Mail</a>
        </div>
      </div>
    </footer>
  )
}
