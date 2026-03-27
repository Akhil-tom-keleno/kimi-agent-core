import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Settings, Users, Wrench, Sparkles, Shield, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchPage } from '../lib/api';

const OperationsPage = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'operations'],
    queryFn: () => fetchPage('operations'),
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#4353FF]/20 text-[#4353FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Settings className="w-4 h-4" />
                Operations Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {content.hero?.title || "Seamless Property Operations Management"}
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                {content.hero?.subtitle || "End-to-end operational excellence that ensures 5-star guest experiences and hassle-free property management"}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#4353FF] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#4353FF] to-[#4353FF]/60 rounded-2xl p-6">
                    <Users className="w-8 h-8 text-white mb-3" />
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-white/70">Guest Support</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <Sparkles className="w-8 h-8 text-[#4353FF] mb-3" />
                    <div className="text-3xl font-bold">5-Star</div>
                    <div className="text-sm text-gray-400">Guest Experience</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <Wrench className="w-8 h-8 text-[#4353FF] mb-3" />
                    <div className="text-3xl font-bold">Fast</div>
                    <div className="text-sm text-gray-400">Maintenance</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#4353FF]/60 to-[#4353FF] rounded-2xl p-6">
                    <Shield className="w-8 h-8 text-white mb-3" />
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-sm text-white/70">Quality Assured</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              {content.services?.title || "Complete Operations Services"}
            </h2>
            <p className="text-lg text-gray-600">
              {content.services?.subtitle || "We handle every aspect of your property operations so you don't have to worry about a thing"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.services?.items || [
              {
                icon: "Users",
                title: "Guest Communication",
                description: "24/7 multilingual guest support before, during, and after their stay"
              },
              {
                icon: "Sparkles",
                title: "Housekeeping",
                description: "Professional cleaning services ensuring 5-star standards every time"
              },
              {
                icon: "Wrench",
                title: "Maintenance",
                description: "Rapid response maintenance team for all property repairs and issues"
              },
              {
                icon: "Shield",
                title: "Quality Control",
                description: "Rigorous inspections to maintain the highest property standards"
              },
              {
                icon: "Clock",
                title: "Check-in/Check-out",
                description: "Seamless guest arrivals and departures with key management"
              },
              {
                icon: "Settings",
                title: "Supply Management",
                description: "Restocking amenities, linens, and all guest essentials"
              }
            ]).map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#4353FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="w-7 h-7 text-[#4353FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              {content.process?.title || "How Our Operations Work"}
            </h2>
            <p className="text-lg text-gray-600">
              {content.process?.subtitle || "A streamlined process designed for efficiency and excellence"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.process?.steps || [
              { number: "01", title: "Booking Received", description: "Instant notification and reservation confirmation" },
              { number: "02", title: "Pre-Arrival Prep", description: "Property prepared and inspected before guest arrival" },
              { number: "03", title: "Guest Stay", description: "24/7 support and seamless experience throughout" },
              { number: "04", title: "Post-Departure", description: "Cleaning, inspection, and preparation for next guest" }
            ]).map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl font-bold text-[#4353FF] mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {content.quality?.title || "Uncompromising Quality Standards"}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {content.quality?.description || "Every property under our management meets the highest standards of cleanliness, maintenance, and guest experience."}
              </p>
              <div className="space-y-4">
                {(content.quality?.items || [
                  "5-star cleaning standards for every turnover",
                  "Regular property inspections and maintenance",
                  "Premium amenities and supplies provided",
                  "Professional photography and listing optimization",
                  "Guest review management and response"
                ]).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#4353FF] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-[#4353FF] mb-2">4.9</div>
                <div className="text-gray-400">Average Guest Rating</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-[#4353FF] mb-2">2h</div>
                <div className="text-gray-400">Avg. Response Time</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-[#4353FF] mb-2">98%</div>
                <div className="text-gray-400">5-Star Reviews</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-[#4353FF] mb-2">24/7</div>
                <div className="text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4353FF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let Us Handle Your Property Operations
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Focus on what matters while we take care of the day-to-day operations of your holiday home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-[#4353FF] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OperationsPage;
