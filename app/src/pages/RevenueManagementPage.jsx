import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const RevenueManagementPage = () => {
  return (
    <Layout>
      {/* Hero Section - Centered Single Column */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
          <span className="section-label">SOLUTIONS</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1] tracking-tight">
            Revenue Management
          </h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Put your rates on autopilot. CORE ensures your listings are priced to maximize revenue, boost occupancy, and stay ahead of the market.
          </p>
          <Link to="/book-a-call" className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            Book a call
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-corex-darker border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">+20%</p>
              <p className="text-gray-500">Average Revenue Increase</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">24/7</p>
              <p className="text-gray-500">Price Optimization</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">50+</p>
              <p className="text-gray-500">Data Points Analyzed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Intelligent pricing<br />for maximum returns</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="feature-card rounded-3xl p-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Market Analysis</h3>
              <p className="text-gray-500 leading-relaxed">Real-time monitoring of competitor rates, local events, and seasonal trends across Dubai's holiday home market.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card rounded-3xl p-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dynamic Pricing</h3>
              <p className="text-gray-500 leading-relaxed">Automated price adjustments based on demand patterns, booking windows, and occupancy forecasts.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card rounded-3xl p-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Performance Reports</h3>
              <p className="text-gray-500 leading-relaxed">Detailed analytics and insights on your property's performance, revenue trends, and market positioning.</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card rounded-3xl p-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Event-Based Pricing</h3>
              <p className="text-gray-500 leading-relaxed">Automatic rate adjustments for major Dubai events like Expo, Formula 1, and holiday seasons.</p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card rounded-3xl p-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Channel Sync</h3>
              <p className="text-gray-500 leading-relaxed">Unified pricing across Airbnb, Booking.com, Expedia, and direct booking channels.</p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card rounded-3xl p-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Last-Minute Optimization</h3>
              <p className="text-gray-500 leading-relaxed">Smart discounts and promotions to fill gaps in your calendar and maximize occupancy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-32 px-6 bg-corex-darker">
        <div className="max-w-6xl mx-auto">
          <div className="feature-card rounded-[2rem] p-8 md:p-12 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 mb-6">Featured Case Study</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Turning Properties Into Market Leaders</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  How we helped a luxury villa owner in Palm Jumeirah increase their RevPAR by 35% while maintaining 85%+ occupancy year-round.
                </p>
                <div className="flex gap-8 mb-8">
                  <div>
                    <p className="text-5xl font-black text-white mb-1">35%</p>
                    <p className="text-gray-500 text-sm">RevPAR Increase</p>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div>
                    <p className="text-5xl font-black text-white mb-1">85%</p>
                    <p className="text-gray-500 text-sm">Occupancy Rate</p>
                  </div>
                </div>
                <Link to="/blog" className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
                  Read Full Case Study 
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
              
              {/* Right Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src="https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/1147490b45d1707e4edbbe34efea6c4f76ed9352.jpg" alt="Luxury Villa Palm Jumeirah" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="feature-card rounded-3xl p-8 md:p-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "CORE has been an absolute asset to our team. Their sharp eye for market trends, dynamic pricing strategies, and consistent focus on revenue growth have made a real impact on our performance. They always find smart ways to stay ahead of the curve."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-bold text-white">Abir Chammah</p>
                  <p className="text-gray-500 text-sm">Manager, Monty Holiday Home</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="feature-card rounded-3xl p-8 md:p-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "Working with CORE has been an absolute game changer for my Airbnb business in Dubai. Their expertise in revenue management and pricing strategy has helped me maximise my earnings while maintaining high occupancy rates."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <p className="font-bold text-white">Charlie Ridge</p>
                  <p className="text-gray-500 text-sm">Owner, Farwell and Gervase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Centered Single Column */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label">GET STARTED</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to maximize<br />your revenue?
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Join hundreds of property owners who trust CORE's revenue management to optimize their pricing strategy.
          </p>
          <Link to="/book-a-call" className="inline-block bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default RevenueManagementPage
