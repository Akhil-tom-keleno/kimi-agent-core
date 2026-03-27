import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { pagesAPI } from '../lib/api'
import { TrendingUp, Clock, Star, ArrowRight } from 'lucide-react'

const HomePage = () => {
  const { data: page, isLoading } = useQuery({
    queryKey: ['page', 'index'],
    queryFn: () => pagesAPI.getBySlug('index').then(res => res.data)
  })

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </Layout>
    )
  }

  const hero = page?.hero || {}
  const stats = page?.stats || [
    { value: '200+', label: 'Properties Managed' },
    { value: '+20%', label: 'Avg. Revenue Increase' },
    { value: '4.9', label: 'Guest Rating' }
  ]
  const cta = page?.cta || {}

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-48 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            {hero.headline || 'Operating Partner for Holiday Home Businesses'}
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            {hero.subtitle || "We built the infrastructure so you don't have to. Plug in world-class distribution, revenue management, and operational efficiency."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to={hero.ctaLink || '/book-a-call'} className="btn-primary">
              {hero.ctaText || 'Partner With Us'}
            </Link>
            <Link to="/revenue-management" className="text-gray-400 hover:text-white font-medium transition-colors py-4 flex items-center gap-2">
              Explore Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-core-gray border border-white/10">
              <img 
                src={hero.image || 'https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/d0bfeee6e555a530435123d01951d22097b0fd13.jpg'} 
                alt="Dubai Apartment" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-core-darker border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-5xl md:text-6xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Everything you need to scale</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Revenue Management</h3>
              <p className="text-gray-500 leading-relaxed">AI-powered dynamic pricing that adapts to market demand and maximizes your yield.</p>
              <Link to="/revenue-management" className="inline-flex items-center gap-2 text-white mt-4 hover:text-gray-300 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="feature-card">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Operations</h3>
              <p className="text-gray-500 leading-relaxed">End-to-end operations management including housekeeping, maintenance, and guest communication.</p>
              <Link to="/operations" className="inline-flex items-center gap-2 text-white mt-4 hover:text-gray-300 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="feature-card">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Guest Experience</h3>
              <p className="text-gray-500 leading-relaxed">Deliver exceptional guest experiences that earn five-star reviews consistently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {cta.headline || 'Ready to scale your holiday home business?'}
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            {cta.description || "Let's discuss how CORE can help you grow."}
          </p>
          <Link to="/book-a-call" className="btn-primary">
            {cta.buttonText || 'Book a call'}
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
