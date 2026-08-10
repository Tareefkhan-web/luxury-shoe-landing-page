import { Feather, Gem, Recycle, Zap } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FEATURES = [
  {
    icon: Feather,
    title: 'Aerogel Midsole',
    desc: 'A near-weightless lattice that returns energy with every stride.',
  },
  {
    icon: Gem,
    title: '24k Gold Detailing',
    desc: 'Hand-applied metallic accents, individually inspected and numbered.',
  },
  {
    icon: Zap,
    title: 'Adaptive Fit',
    desc: 'Memory-knit upper that molds to your foot within the first mile.',
  },
  {
    icon: Recycle,
    title: 'Circular Craft',
    desc: 'Fully reclaimable materials sourced from certified ateliers.',
  },
]

export function TechnologySection() {
  return (
    <section id="technology" className="relative px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[80vw] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Technology
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Invisible science, <span className="text-gradient-gold">visible luxury</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              We spent four years in the lab so you could forget the shoe is
              there. Every layer is purpose-built to disappear beneath you — until
              someone notices the gold.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <Reveal
                key={feature.title}
                delay={i * 120}
                className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:gold-glow"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
