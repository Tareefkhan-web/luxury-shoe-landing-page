'use client'

import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Technology', href: '#technology' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass-strong gold-glow' : 'glass'
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-lg font-extrabold text-primary-foreground">
            A
          </span>
          <span className="font-display text-xl font-extrabold tracking-[0.2em] text-foreground">
            AURUM
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground hover:bg-primary/10 hover:text-primary"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-primary/10 hover:text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong animate-fade-up mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
