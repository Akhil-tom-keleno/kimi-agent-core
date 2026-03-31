import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-48 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Operating Partner for Holiday Home Businesses
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            We built the infrastructure so you don't have to. Plug in world-class distribution, revenue management, and operational efficiency — and focus on what makes your brand great.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/book-a-call" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
              Partner With Us
            </Link>
            <Link to="#features" className="text-gray-400 hover:text-white font-medium transition-colors py-4">
              Explore Features →
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-corex-gray border border-white/10">
              <img 
                src="https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/d0bfeee6e555a530435123d01951d22097b0fd13.jpg" 
                alt="Dubai Apartment with Burj Khalifa View" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label">Full-Service Management</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Everything you need to run<br />your holiday home business</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From pricing optimization to housekeeping, we provide the technology and team to maximize your revenue while you maintain control.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Revenue Management */}
            <div className="feature-card rounded-3xl overflow-hidden group bg-corex-gray">
              <div className="h-64 bg-gradient-to-br from-corex-grayLight to-black p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-corex-dark rounded-xl p-4 shadow-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-500">Revenue</span>
                      <span className="text-xs text-white font-bold">+24%</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">$28,450</div>
                    <div className="flex gap-1 h-12 items-end">
                      <div className="flex-1 bg-white/20 rounded-sm h-[60%]"></div>
                      <div className="flex-1 bg-white/20 rounded-sm h-[80%]"></div>
                      <div className="flex-1 bg-white/20 rounded-sm h-[45%]"></div>
                      <div className="flex-1 bg-white/20 rounded-sm h-[90%]"></div>
                      <div className="flex-1 bg-white rounded-sm h-[100%]"></div>
                      <div className="flex-1 bg-white/40 rounded-sm h-[85%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Pricing Intelligence</div>
                <h3 className="text-2xl font-bold text-white mb-3">Revenue Management</h3>
                <p className="text-gray-500 text-sm leading-relaxed">AI-powered dynamic pricing that adapts to Dubai's seasonal demand, events, and market trends to maximize your yield.</p>
              </div>
            </div>

            {/* 2. Guest Communication */}
            <div className="feature-card rounded-3xl overflow-hidden group bg-corex-gray">
              <div className="h-64 bg-gradient-to-br from-corex-grayLight to-black p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-corex-dark rounded-2xl p-4 shadow-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-xs font-bold">C</div>
                      <div className="text-xs text-gray-500">CORE Concierge</div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-lg p-3 rounded-tl-none">
                        <p className="text-xs text-gray-300">Good morning! I'd like to book a restaurant in Downtown for tonight.</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 rounded-tr-none ml-4 border border-white/20">
                        <p className="text-xs text-white">Absolutely! I'd recommend At.mosphere. Shall I make a reservation for 8 PM?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Concierge 24/7</div>
                <h3 className="text-2xl font-bold text-white mb-3">Guest Communication</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Round-the-clock messaging support, personalized recommendations, and instant responses to guest inquiries.</p>
              </div>
            </div>

            {/* 3. Distribution */}
            <div className="feature-card rounded-3xl overflow-hidden group bg-corex-gray">
              <div className="h-64 bg-gradient-to-br from-corex-grayLight to-black p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-corex-dark rounded-xl p-4 shadow-2xl border border-white/10">
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 bg-black/50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-gray-500 mb-1">Airbnb</div>
                        <div className="text-xs text-white font-bold">87%</div>
                      </div>
                      <div className="flex-1 bg-black/50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-gray-500 mb-1">Booking</div>
                        <div className="text-xs text-white font-bold">65%</div>
                      </div>
                      <div className="flex-1 bg-white/20 rounded-lg p-2 text-center border border-white/30">
                        <div className="text-[10px] text-white mb-1">Direct</div>
                        <div className="text-xs text-white font-bold">92%</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 text-center">Multi-channel distribution</div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Channel Management</div>
                <h3 className="text-2xl font-bold text-white mb-3">Distribution</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Sync your property across Airbnb, Booking.com, Expedia, and our direct booking platform with unified calendar management.</p>
              </div>
            </div>

            {/* 4. Housekeeping */}
            <div className="feature-card rounded-3xl overflow-hidden group bg-corex-gray">
              <div className="h-64 bg-gradient-to-br from-corex-grayLight to-black p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-corex-dark rounded-xl p-4 shadow-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-500">Today's Schedule</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">3 Tasks</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 bg-black/30 rounded-lg p-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-xs text-white">Unit 2401 - Turnover</div>
                          <div className="text-[10px] text-gray-600">11:00 AM - 2:00 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-black/30 rounded-lg p-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-xs text-white">Penthouse 5202</div>
                          <div className="text-[10px] text-gray-600">Deep Clean - 3:00 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Operations</div>
                <h3 className="text-2xl font-bold text-white mb-3">Housekeeping</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Coordinated cleaning schedules, quality inspections, and linen management between guest check-ins.</p>
              </div>
            </div>

            {/* 5. Maintenance */}
            <div className="feature-card rounded-3xl overflow-hidden group bg-corex-gray">
              <div className="h-64 bg-gradient-to-br from-corex-grayLight to-black p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-corex-dark rounded-xl p-4 shadow-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-white font-bold">Urgent: AC Repair</div>
                        <div className="text-[10px] text-gray-600">Marina Heights #1204</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 bg-white/20 rounded-lg py-2 text-center">
                        <div className="text-[10px] text-white">Assigned</div>
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-lg py-2 text-center">
                        <div className="text-[10px] text-gray-500">In Progress</div>
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-lg py-2 text-center">
                        <div className="text-[10px] text-gray-500">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Property Care</div>
                <h3 className="text-2xl font-bold text-white mb-3">Maintenance</h3>
                <p className="text-gray-500 text-sm leading-relaxed">24/7 maintenance coordination, emergency repairs, and preventive care to protect your investment.</p>
              </div>
            </div>

            {/* 6. Inspections */}
            <div className="feature-card rounded-3xl overflow-hidden group bg-corex-gray">
              <div className="h-64 bg-gradient-to-br from-corex-grayLight to-black p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-corex-dark rounded-xl p-4 shadow-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">Inspection Report</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">Passed</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-xs text-gray-300">Cleanliness Check</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-xs text-gray-300">Amenities Stocked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-xs text-gray-300">Damage Assessment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-xs text-gray-300">Photography</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Quality Assurance</div>
                <h3 className="text-2xl font-bold text-white mb-3">Inspections</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Pre and post-stay inspections with photo documentation to ensure quality standards and protect against damages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform/Dashboard Section */}
      <section id="platform" className="py-24 px-6 relative bg-corex-darker">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-corex-gray rounded-3xl p-6 md:p-8 relative overflow-hidden border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-gray-600 text-sm">Welcome back,</p>
                    <p className="text-white font-bold text-lg">Property Owner</p>
                  </div>
                  <div className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold">Live Data</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-gray-600 text-xs mb-1">Avg. Booking Value</p>
                    <p className="text-2xl font-bold text-white">$412</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-gray-600 text-xs mb-1">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-white">87%</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <span className="text-2xl font-bold text-white">$24,500</span>
                  </div>
                  <div className="h-32 flex items-end gap-2">
                    <div className="flex-1 bg-white/20 rounded-t-sm h-[40%]"></div>
                    <div className="flex-1 bg-white/20 rounded-t-sm h-[60%]"></div>
                    <div className="flex-1 bg-white/20 rounded-t-sm h-[45%]"></div>
                    <div className="flex-1 bg-white/20 rounded-t-sm h-[70%]"></div>
                    <div className="flex-1 bg-white/20 rounded-t-sm h-[55%]"></div>
                    <div className="flex-1 bg-white/40 rounded-t-sm h-[80%]"></div>
                    <div className="flex-1 bg-white rounded-t-sm h-[95%]"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-800">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-black/50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Guest Satisfaction</p>
                      <p className="text-sm font-bold text-white">4.9/5.0</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Views</p>
                      <p className="text-sm font-bold text-white">12.4k</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="section-label">The Platform</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Increase profits<br />with intelligence</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Upgrade your performance with dedicated revenue management, distribution and efficient operations to lower costs. CORE partners outperform the market by +20%.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Dynamic Pricing</h4>
                    <p className="text-sm text-gray-600">AI-powered rates that adapt to Dubai market demand</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Operations</h4>
                    <p className="text-sm text-gray-600">Streamlined housekeeping, maintenance & inspections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label">Why CORE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The operating partner<br />that puts you first</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card rounded-3xl p-8 text-center">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Keep Your Independence</h3>
              <p className="text-gray-500 leading-relaxed">Maintain control of your property while we handle the technology, marketing, and guest services.</p>
            </div>

            <div className="feature-card rounded-3xl p-8 text-center">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Increase Revenue</h3>
              <p className="text-gray-500 leading-relaxed">Our pricing algorithms and distribution network increase property revenue by an average of 35%.</p>
            </div>

            <div className="feature-card rounded-3xl p-8 text-center">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Protect Your Asset</h3>
              <p className="text-gray-500 leading-relaxed">Regular inspections, maintenance coordination, and insurance partnerships keep your investment safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 bg-corex-darker">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label">Partner With Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to maximize<br />your revenue?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Schedule a call with our team to learn how CORE can help you grow your holiday home business.</p>
          <Link to="/book-a-call" className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            Book a call
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
