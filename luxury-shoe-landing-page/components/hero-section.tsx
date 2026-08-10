'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

const HeroShoeCanvas = dynamic(
  () => import('@/components/hero-shoe-canvas').then((m) => m.HeroShoeCanvas),
  { ssr: false },
)

const FINISHES = [
  { name: 'Signature Gold', tint: '#ffffff', swatch: '#d9b25a' },
  { name: 'Champagne', tint: '#f2e2b8', swatch: '#e6d3a3' },
  { name: 'Rose Bronze', tint: '#e6b48f', swatch: '#c98a5e' },
  { name: 'Platinum', tint: '#cfd6dc', swatch: '#c4c8cc' },
  { name: 'Emerald Noir', tint: '#8fbfa4', swatch: '#2f6b4f' },
]

export function HeroSection() {
  const [finish, setFinish] = useState(FINISHES[0])

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-16"
    >
      {/* ambient glow backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background)_85%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
        {/* Copy */}
        <div className="animate-fade-up text-center lg:text-left">
          <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 lg:mx-0">
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              Limited Aurelian Series — 300 pairs worldwide
            </span>
          </div>

          <h1 className="text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Step Into{' '}
            <span className="text-gradient-gold">Liquid Gold</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground lg:mx-0">
            Aerospace-grade engineering wrapped in hand-finished 24k detailing.
            AURUM redefines what performance footwear can feel like — weightless,
            precise, and unmistakably rare.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#collection"
              className="group glass-strong gold-glow inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:text-primary"
            >
              Shop Now
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#technology"
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Explore the craft
            </a>
          </div>

          <dl className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6 lg:mx-0">
            {[
              { value: '187g', label: 'Feather weight' },
              { value: '24k', label: 'Gold accents' },
              { value: '∞', label: 'Rebound energy' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="font-display text-3xl font-bold text-gradient-gold">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3D canvas */}
        <div
          className="relative h-[420px] w-full overflow-hidden rounded-[2rem] sm:h-[520px] lg:h-[600px]"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, oklch(0.16 0.01 70) 0%, #000000 70%)',
          }}
        >
          <HeroShoeCanvas tint={finish.tint} />

          {/* Live color configurator */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-3">
            <div className="glass flex items-center gap-3 rounded-full px-4 py-2.5">
              {FINISHES.map((f) => {
                const active = f.name === finish.name
                return (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setFinish(f)}
                    aria-label={`Preview ${f.name} finish`}
                    aria-pressed={active}
                    className={`size-6 rounded-full transition-all duration-300 hover:scale-110 ${
                      active
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'ring-1 ring-border'
                    }`}
                    style={{ backgroundColor: f.swatch }}
                  />
                )
              })}
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
              {finish.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
