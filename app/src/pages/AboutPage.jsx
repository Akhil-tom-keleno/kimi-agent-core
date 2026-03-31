import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="section-label">ABOUT US</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tight">
                WELCOME<br />TO CORE
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Running a holiday home business isn't hard because of the guests — it's hard because of everything around them. The late-night maintenance calls. The revenue left on the table. The operations that don't scale.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                CORE was built to fix that. We're the operating partner for serious holiday home operators in the UAE — handling the full stack of operations so you can focus on growing your portfolio, not firefighting it.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-corex-gray border border-white/10">
                <img src="https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/1147490b45d1707e4edbbe34efea6c4f76ed9352.jpg" alt="Dubai Villa" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 bg-corex-darker">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label">Our Mission</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Empowering hosts to<br />thrive</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            We exist to give holiday home operators an unfair advantage. That means better revenue performance, tighter operations, and guest experiences that earn five-star reviews consistently - not occasionally.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed">
            We handle revenue management, dynamic pricing, housekeeping, maintenance, and guest communication. You retain ownership. We deliver the outcomes.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What drives us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-gray-500 leading-relaxed">We maintain the highest standards in everything we do, from property care to guest experiences.</p>
            </div>

            <div className="feature-card rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Partnership</h3>
              <p className="text-gray-500 leading-relaxed">We succeed when our partners succeed. Your growth is our growth.</p>
            </div>

            <div className="feature-card rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precision</h3>
              <p className="text-gray-500 leading-relaxed">We use data, technology, and process — not gut feel — to drive performance across every property we manage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-corex-darker border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">200+</p>
              <p className="text-gray-500">Properties Managed</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">+20%</p>
              <p className="text-gray-500">Avg. Revenue Increase</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">4.9</p>
              <p className="text-gray-500">Guest Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built by operators,<br />for operators</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                CORE was founded by a team of hospitality professionals who saw a gap in the market. Operators were struggling to manage the operational complexity of running holiday homes while trying to scale their businesses.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                We set out to build the infrastructure that would let operators focus on what they do best — creating amazing guest experiences and growing their portfolios.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Our deep understanding of the market, combined with cutting-edge technology and operational expertise, makes us the preferred partner for serious holiday home operators.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-corex-gray border border-white/10">
                <img src="https://kimi-web-img.moonshot.cn/img/dubai-immo.com/772969532c719ddf918559181503fc4df944701b.jpg" alt="Dubai Skyline" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-corex-darker">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label">Join Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to partner<br />with CORE?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Let's discuss how we can help you scale your holiday home business.</p>
          <Link to="/contact" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default AboutPage
