import { ProductCard, type Product } from '@/components/product-card'
import { Reveal } from '@/components/reveal'

const PRODUCTS: Product[] = [
  {
    id: 'aurelian-x',
    name: 'Aurelian X',
    tagline: 'Signature',
    price: '$1,290',
    image: '/shoes/shoe-gold.png',
    colors: [
      { name: 'Obsidian Gold', hex: '#c9a44a' },
      { name: 'Onyx', hex: '#1a1a1a' },
      { name: 'Champagne', hex: '#e6d3a3' },
    ],
  },
  {
    id: 'velocity-chrome',
    name: 'Velocity Chrome',
    tagline: 'Performance',
    price: '$980',
    image: '/shoes/shoe-silver.png',
    colors: [
      { name: 'Liquid Silver', hex: '#c4c8cc' },
      { name: 'Graphite', hex: '#3a3d40' },
      { name: 'Platinum', hex: '#e2e4e6' },
    ],
  },
  {
    id: 'heritage-bronze',
    name: 'Heritage Bronze',
    tagline: 'Atelier',
    price: '$1,540',
    image: '/shoes/shoe-bronze.png',
    colors: [
      { name: 'Aged Bronze', hex: '#8a5a2b' },
      { name: 'Espresso', hex: '#2c1d12' },
      { name: 'Copper', hex: '#b87333' },
    ],
  },
]

export function ProductsSection() {
  return (
    <section id="collection" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            The Collection
          </p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Engineered for the{' '}
            <span className="text-gradient-gold">few</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Each pair is assembled by hand, numbered, and finished with genuine
            metallic accents. Hover to inspect every angle.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 120}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
