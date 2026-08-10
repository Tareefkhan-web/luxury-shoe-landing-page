import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
import { TechnologySection } from '@/components/technology-section'
import { SiteFooter } from '@/components/site-footer'
import { IntroLoader } from '@/components/intro-loader'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <IntroLoader />
      <SiteHeader />
      <HeroSection />
      <ProductsSection />
      <TechnologySection />
      <SiteFooter />
    </main>
  )
}
