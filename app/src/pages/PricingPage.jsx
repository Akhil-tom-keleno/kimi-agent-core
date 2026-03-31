import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const PricingPage = () => {
  const faqs = [
    {
      question: "What's included in the management fee?",
      answer: "Our management fee covers everything from listing optimization and dynamic pricing to guest communication and performance reporting. Housekeeping and maintenance are available as add-ons or included in higher-tier plans."
    },
    {
      question: "Are there any setup fees?",
      answer: "No, there are no setup fees. We believe in earning your business through results, not upfront costs."
    },
    {
      question: "How do I get paid?",
      answer: "You receive your rental income directly from the booking platforms (Airbnb, Booking.com, etc.). Our management fee is invoiced monthly based on your booking revenue."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, our agreements are month-to-month with a 30-day notice period. We believe in earning your business every month through exceptional service and results."
    },
    {
      question: "What properties do you work with?",
      answer: "We work with holiday homes, vacation rentals, and short-term rental properties across Dubai. All properties must meet our quality standards and comply with local regulations."
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span className="section-label">Pricing</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
            Simple, transparent<br />pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Choose the plan that fits your portfolio. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Revenue Optimization Plan */}
            <div className="pricing-card rounded-3xl p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Revenue Optimization</h3>
                <p className="text-gray-500 text-sm">Put your pricing on autopilot</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Listing optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Dynamic pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Forecast Creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Monthly reporting</span>
                </li>
              </ul>
              <Link to="/book-a-call" className="block w-full text-center bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300">
                Get Pricing
              </Link>
            </div>

            {/* Operations Plan */}
            <div className="pricing-card popular rounded-3xl p-8 pt-12">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Operations</h3>
                <p className="text-gray-500 text-sm">Put your operations on autopilot</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Housekeeping included</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Guest Communication</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Weekly reporting</span>
                </li>
              </ul>
              <Link to="/book-a-call" className="block w-full text-center bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300">
                Get Pricing
              </Link>
            </div>

            {/* Full Stack Plan */}
            <div className="pricing-card rounded-3xl p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Full Stack</h3>
                <p className="text-gray-500 text-sm">For serious operators</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Everything in Revenue Optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Everything in Operations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">Dedicated revenue manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-300">New property onboarding support</span>
                </li>
              </ul>
              <Link to="/book-a-call" className="block w-full text-center bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300">
                Get Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-corex-darker">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently asked<br />questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="feature-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Still have questions?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Schedule a call with our team to discuss your specific needs and get a personalized quote.</p>
          <Link to="/book-a-call" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            Book a call
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default PricingPage
