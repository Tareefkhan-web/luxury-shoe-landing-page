'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Camera, PlayCircle, Send } from 'lucide-react'

const LINK_GROUPS = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'The Collection', 'Limited Editions', 'Gift Cards'],
  },
  {
    title: 'Atelier',
    links: ['Our Story', 'Craftsmanship', 'Sustainability', 'Careers'],
  },
  {
    title: 'Support',
    links: ['Shipping', 'Returns', 'Size Guide', 'Contact'],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    window.setTimeout(() => setSent(false), 2400)
  }

  return (
    <footer id="contact" className="relative px-4 pb-10 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            {/* Brand + newsletter */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-lg font-extrabold text-primary-foreground">
                  A
                </span>
                <span className="font-display text-xl font-extrabold tracking-[0.2em] text-foreground">
                  AURUM
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Join the waitlist for the next drop. No noise — only first access
                to the rarest footwear on earth.
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="glass flex items-center gap-2 rounded-full p-1.5 pl-5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-105"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
                {sent && (
                  <p className="animate-fade-up mt-3 pl-2 text-xs text-primary">
                    You&apos;re on the list. Welcome to AURUM.
                  </p>
                )}
              </form>
            </div>

            {/* Link groups */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {LINK_GROUPS.map((group) => (
                <div key={group.title}>
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    {group.title}
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AURUM Footwear. Crafted with intent.
            </p>
            <div className="flex items-center gap-2">
              {[Camera, Send, PlayCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
