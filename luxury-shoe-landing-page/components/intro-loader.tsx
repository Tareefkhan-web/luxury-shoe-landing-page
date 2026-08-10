'use client'

import { useEffect, useState } from 'react'

export function IntroLoader() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    // Lock scroll while the intro plays.
    document.body.style.overflow = 'hidden'
    const outTimer = setTimeout(() => setPhase('out'), 1900)
    const doneTimer = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2700)

    return () => {
      clearTimeout(outTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700"
      style={{ opacity: phase === 'out' ? 0 : 1 }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />
      <div className="relative flex flex-col items-center gap-4">
        <span className="animate-intro-letters font-display text-6xl font-extrabold tracking-[0.2em] text-gradient-gold sm:text-7xl">
          AURUM
        </span>
        <span className="h-px w-0 animate-intro-line bg-gradient-to-r from-transparent via-primary to-transparent" />
        <span className="animate-intro-fade text-[11px] uppercase tracking-[0.5em] text-muted-foreground">
          Liquid Gold
        </span>
      </div>
    </div>
  )
}
