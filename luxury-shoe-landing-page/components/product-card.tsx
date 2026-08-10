'use client'

import { useRef, useState, type PointerEvent } from 'react'
import Image from 'next/image'
import { Check, Plus } from 'lucide-react'

export type Product = {
  id: string
  name: string
  tagline: string
  price: string
  image: string
  colors: { name: string; hex: string }[]
}

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const [added, setAdded] = useState(false)

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -12, y: px * 12 })
  }

  const reset = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const handleAdd = () => {
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group glass relative overflow-hidden rounded-3xl p-6 will-change-transform hover:gold-glow"
    >
      {/* sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at 50% 0%, color-mix(in oklch, var(--gold) 16%, transparent), transparent 60%)',
        }}
      />

      <div className="relative flex items-start justify-between">
        <span className="glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
          {product.tagline}
        </span>
        <span className="font-display text-lg font-bold text-gradient-gold">
          {product.price}
        </span>
      </div>

      {/* Image */}
      <div
        className="relative mx-auto my-4 aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl"
        style={{
          transform: 'translateZ(40px)',
          background:
            'radial-gradient(circle at 50% 45%, oklch(0.18 0.01 70) 0%, #000000 72%)',
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-2xl transition-all duration-500 group-hover:bg-primary/25" />
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="240px"
          className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>

      <div className="relative" style={{ transform: 'translateZ(25px)' }}>
        <h3 className="font-display text-xl font-bold text-foreground">
          {product.name}
        </h3>

        {/* Color swatches */}
        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((color, i) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setActiveColor(i)}
              aria-label={`Select ${color.name}`}
              aria-pressed={activeColor === i}
              className={`size-6 rounded-full border transition-all duration-200 ${
                activeColor === i
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/60'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {product.colors[activeColor].name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="glass-strong mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.02] hover:text-primary"
        >
          {added ? (
            <>
              <Check className="size-4 text-primary" />
              Added to Cart
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
