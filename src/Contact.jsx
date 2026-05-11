import { useEffect, useMemo, useState } from 'react'
import './Contact.css'

const contactInfo = {
  email: 'aayushgupta054@gmail.com',
  location: 'Financial District, Hyderabad',
}

const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/aayush-gupta-b6066b290/' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/Aayush251105' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/aayushh.x._/' },
]

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

function buildComposeUrl({ email, subject, body }) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
    su: subject,
    body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [visible, setVisible] = useState(false)
  const [submitState, setSubmitState] = useState('idle')

  const composeUrl = useMemo(() => {
    const subject = form.subject || 'Portfolio Inquiry'
    const body = `Hi Aayush,\n\nI'm ${form.name || 'your name'} (${form.email || 'your email'}).\n\n${form.message || 'I wanted to get in touch about your work.'}`

    return buildComposeUrl({
      email: contactInfo.email,
      subject,
      body,
    })
  }, [form.email, form.message, form.name, form.subject])

  useEffect(() => {
    const section = document.getElementById('contact')
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState('sending')

    try {
      const response = await fetch('https://formsubmit.co/ajax/aayushgupta054@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Inquiry',
          message: form.message,
          _captcha: false,
          _template: 'table',
        }),
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setForm({ name: '', email: '', subject: '', message: '' })
      setSubmitState('success')
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      window.open(composeUrl, '_blank', 'noopener,noreferrer')
      setSubmitState('fallback')
    }
  }

  return (
    <section className={`contact-section ${visible ? 'contact-section--visible' : ''}`} id="contact">
      <div className="contact-orb contact-orb--1" />
      <div className="contact-orb contact-orb--2" />

      <div className="contact-header">
        <span className="contact-status">
          <span className="contact-status-dot" />
          Open to Opportunities
        </span>
        <h2 className="contact-title">
          Let's Build
          <br />
          <span className="contact-title-accent">Something Great</span>
        </h2>
        <p className="contact-subtitle">
          Whether you have a project in mind, want to discuss the latest in AI, or just want to say hello - my inbox is always open.
        </p>
      </div>

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
                <label className="form-float-label" htmlFor="c-name">
                  Your Name
                </label>
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
                <label className="form-float-label" htmlFor="c-email">
                  Email Address
                </label>
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
              <label className="form-float-label" htmlFor="c-subject">
                Subject
              </label>
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
              <label className="form-float-label" htmlFor="c-message">
                Your Message
              </label>
            </div>

            <button type="submit" className="form-submit" disabled={submitState === 'sending'}>
              <span>
                {submitState === 'sending'
                  ? 'Sending...'
                  : submitState === 'success'
                    ? 'Message Sent'
                    : submitState === 'fallback'
                      ? 'Open Email Draft'
                      : 'Send Message'}
              </span>
              <SendIcon />
            </button>

            {(submitState === 'success' || submitState === 'fallback') && (
              <p className="form-status" aria-live="polite">
                {submitState === 'success'
                  ? 'Your message was sent successfully.'
                  : 'Email draft opened in your browser. Send it from there if you prefer webmail.'}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="contact-pills">
        <a href={composeUrl} target="_blank" rel="noopener noreferrer" className="contact-pill">
          <span className="contact-pill-icon">Email</span>
          {contactInfo.email}
        </a>
        <span className="contact-pill contact-pill--muted">
          <span className="contact-pill-icon">Location</span>
          {contactInfo.location}
        </span>
      </div>

      <div className="contact-socials">
        {socialLinks.map((social) => (
          <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="contact-social-link">
            {social.label}
            <ArrowIcon />
          </a>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  const mailCompose = buildComposeUrl({
    email: contactInfo.email,
    subject: 'Portfolio Inquiry',
    body: 'Hi Aayush,\n\nI wanted to get in touch about your portfolio.',
  })

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">Aayush Gupta</span>
        <span className="footer-copy">
          (c) {new Date().getFullYear()} Aayush Gupta | Engineered for Intelligence
        </span>
        <div className="footer-links">
          <a href="https://github.com/Aayush251105" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/aayush-gupta-b6066b290/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/aayushh.x._/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={mailCompose} target="_blank" rel="noopener noreferrer">
            Mail
          </a>
        </div>
      </div>
    </footer>
  )
}
