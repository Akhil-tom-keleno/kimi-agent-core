import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const OperationsPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span className="section-label">Solutions</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
            Operations
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            End-to-end operations management that ensures your properties are maintained to the highest standards, every single day.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-corex-darker border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">4.9</p>
              <p className="text-gray-500">Average Guest Rating</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">24/7</p>
              <p className="text-gray-500">Support Available</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">&lt;2min</p>
              <p className="text-gray-500">Average Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Complete operational<br />excellence</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Housekeeping */}
            <div className="feature-card rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Housekeeping</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">Professional cleaning services between guest stays, with detailed checklists and quality inspections to ensure 5-star standards.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Turnover cleaning
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Deep cleaning schedules
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Linen & amenity restocking
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="feature-card rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Maintenance</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">24/7 maintenance coordination with trusted contractors for everything from AC repairs to plumbing emergencies.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Emergency repairs
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Preventive maintenance
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Appliance servicing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Inspections */}
            <div className="feature-card rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Inspections</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">Comprehensive pre and post-stay inspections with photo documentation to protect your property and ensure quality.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Check-in/check-out reports
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Photo documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Damage assessment
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Guest Communication */}
            <div className="feature-card rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Guest Communication</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">Round-the-clock guest support with instant responses, check-in coordination, and personalized recommendations.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      24/7 messaging support
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Check-in coordination
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      Local recommendations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-corex-darker">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Seamless operations<br />from start to finish</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="font-bold text-white mb-2">Booking Received</h4>
              <p className="text-gray-500 text-sm">Our system automatically schedules all necessary services.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="font-bold text-white mb-2">Pre-Stay Prep</h4>
              <p className="text-gray-500 text-sm">Housekeeping, inspection, and amenity restocking completed.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="font-bold text-white mb-2">Guest Stay</h4>
              <p className="text-gray-500 text-sm">24/7 support available for any guest needs or issues.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h4 className="font-bold text-white mb-2">Post-Stay Review</h4>
              <p className="text-gray-500 text-sm">Inspection, turnover cleaning, and maintenance if needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to streamline<br />your operations?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Let us handle the day-to-day while you focus on growing your portfolio.</p>
          <Link to="/contact" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default OperationsPage
