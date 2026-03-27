import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Zap, Building2 } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchPage } from '../lib/api';

const PricingPage = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'pricing'],
    queryFn: () => fetchPage('pricing'),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4353FF]"></div>
        </div>
      </Layout>
    );
  }

  const content = pageData?.content || {};

  const plans = content.plans || [
    {
      name: "Starter",
      icon: "Zap",
      description: "Perfect for property owners just getting started with short-term rentals",
      price: "15%",
      priceNote: "of booking revenue",
      features: [
        "Listing optimization",
        "Guest communication",
        "Basic housekeeping",
        "Check-in/check-out management",
        "Monthly performance reports",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      icon: "Star",
      description: "Our most popular plan for serious property investors",
      price: "20%",
      priceNote: "of booking revenue",
      features: [
        "Everything in Starter",
        "Dynamic pricing optimization",
        "Professional photography",
        "Premium housekeeping",
        "24/7 guest support",
        "Maintenance coordination",
        "Weekly performance reports",
        "Priority support"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      icon: "Building2",
      description: "For portfolio owners and property developers",
      price: "Custom",
      priceNote: "tailored pricing",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Revenue management strategy",
        "Multi-property dashboard",
        "Custom integrations",
        "White-label options",
        "API access",
        "Strategic consulting"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#4353FF]/20 text-[#4353FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Pricing Plans
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            {content.hero?.title || "Simple, Transparent Pricing"}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {content.hero?.subtitle || "Choose the plan that works best for your property. No hidden fees, no surprises."}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-[#0A0A0A] text-white scale-105 shadow-2xl'
                    : 'bg-gray-50 text-[#0A0A0A]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4353FF] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.popular ? 'bg-[#4353FF]' : 'bg-[#4353FF]/10'
                  }`}>
                    <Zap className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-[#4353FF]'}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                  </div>
                  <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.priceNote}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-[#4353FF]' : 'text-[#4353FF]'
                      }`} />
                      <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === "Enterprise" ? "/contact" : "/contact"}
                  className={`block w-full text-center px-6 py-4 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-[#4353FF] text-white hover:bg-[#4353FF]/90'
                      : 'bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/90'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              {content.comparison?.title || "Compare Plans"}
            </h2>
            <p className="text-lg text-gray-600">
              {content.comparison?.subtitle || "See what's included in each plan"}
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0A0A0A] text-white">
                    <th className="text-left px-6 py-4 font-semibold">Feature</th>
                    <th className="text-center px-6 py-4 font-semibold">Starter</th>
                    <th className="text-center px-6 py-4 font-semibold bg-[#4353FF]">Professional</th>
                    <th className="text-center px-6 py-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {(content.comparison?.features || [
                    { name: "Listing Optimization", starter: true, professional: true, enterprise: true },
                    { name: "Guest Communication", starter: true, professional: true, enterprise: true },
                    { name: "Housekeeping", starter: "Basic", professional: "Premium", enterprise: "Premium" },
                    { name: "Check-in/Check-out", starter: true, professional: true, enterprise: true },
                    { name: "Dynamic Pricing", starter: false, professional: true, enterprise: true },
                    { name: "Professional Photography", starter: false, professional: true, enterprise: true },
                    { name: "24/7 Guest Support", starter: false, professional: true, enterprise: true },
                    { name: "Maintenance Coordination", starter: false, professional: true, enterprise: true },
                    { name: "Dedicated Account Manager", starter: false, professional: false, enterprise: true },
                    { name: "API Access", starter: false, professional: false, enterprise: true },
                    { name: "Custom Integrations", starter: false, professional: false, enterprise: true }
                  ]).map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="px-6 py-4 font-medium text-[#0A0A0A]">{feature.name}</td>
                      <td className="text-center px-6 py-4">
                        {feature.starter === true ? (
                          <Check className="w-5 h-5 text-[#4353FF] mx-auto" />
                        ) : feature.starter === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-600">{feature.starter}</span>
                        )}
                      </td>
                      <td className="text-center px-6 py-4 bg-[#4353FF]/5">
                        {feature.professional === true ? (
                          <Check className="w-5 h-5 text-[#4353FF] mx-auto" />
                        ) : feature.professional === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-600">{feature.professional}</span>
                        )}
                      </td>
                      <td className="text-center px-6 py-4">
                        {feature.enterprise === true ? (
                          <Check className="w-5 h-5 text-[#4353FF] mx-auto" />
                        ) : feature.enterprise === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-600">{feature.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              {content.faq?.title || "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-6">
            {(content.faq?.items || [
              { question: "Are there any setup fees?", answer: "No, we don't charge any setup fees. You only pay the percentage of your booking revenue." },
              { question: "How do I get paid?", answer: "We transfer your earnings directly to your bank account on a monthly basis, with detailed reports of all bookings and expenses." },
              { question: "Can I switch plans?", answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle." },
              { question: "What's included in the percentage fee?", answer: "Our fee covers all operational costs including listing management, guest communication, housekeeping coordination, and platform fees." },
              { question: "Is there a minimum contract period?", answer: "No, our plans are flexible with no long-term contracts. You can cancel with 30 days notice." }
            ]).map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4353FF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Our team is here to help you choose the right plan for your property.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-[#4353FF] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
