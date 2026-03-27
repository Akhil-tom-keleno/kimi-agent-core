import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, DollarSign, PieChart, ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchPage } from '../lib/api';

const RevenueManagementPage = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'revenue-management'],
    queryFn: () => fetchPage('revenue-management'),
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
                <TrendingUp className="w-4 h-4" />
                Revenue Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {content.hero?.title || "Maximize Your Property's Revenue Potential"}
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                {content.hero?.subtitle || "Data-driven pricing strategies and market analysis to increase your rental income by up to 40%"}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#4353FF] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
                >
                  Get Free Revenue Audit
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
              <div className="bg-gradient-to-br from-[#4353FF] to-[#4353FF]/50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                    <DollarSign className="w-8 h-8 text-[#4353FF] mb-3" />
                    <div className="text-3xl font-bold">+40%</div>
                    <div className="text-sm text-gray-400">Revenue Increase</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                    <BarChart3 className="w-8 h-8 text-[#4353FF] mb-3" />
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm text-gray-400">Occupancy Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                    <PieChart className="w-8 h-8 text-[#4353FF] mb-3" />
                    <div className="text-3xl font-bold">2.5x</div>
                    <div className="text-sm text-gray-400">ROI Improvement</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                    <TrendingUp className="w-8 h-8 text-[#4353FF] mb-3" />
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm text-gray-400">Price Optimization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              {content.features?.title || "Comprehensive Revenue Management Solutions"}
            </h2>
            <p className="text-lg text-gray-600">
              {content.features?.subtitle || "Our expert team uses advanced analytics and market insights to optimize your property's performance"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.features?.items || [
              {
                icon: "BarChart3",
                title: "Dynamic Pricing",
                description: "AI-powered pricing algorithms that adjust rates based on demand, seasonality, and market trends"
              },
              {
                icon: "TrendingUp",
                title: "Market Analysis",
                description: "In-depth competitor analysis and market research to position your property strategically"
              },
              {
                icon: "DollarSign",
                title: "Revenue Forecasting",
                description: "Accurate revenue predictions to help you plan and optimize your investment strategy"
              },
              {
                icon: "PieChart",
                title: "Performance Reporting",
                description: "Detailed analytics and reports to track your property's performance metrics"
              },
              {
                icon: "CheckCircle",
                title: "Channel Optimization",
                description: "Maximize visibility across all booking platforms for increased occupancy"
              },
              {
                icon: "BarChart3",
                title: "Occupancy Management",
                description: "Strategic booking management to maintain optimal occupancy rates year-round"
              }
            ]).map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#4353FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-[#4353FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.process?.title || "Our Revenue Management Process"}
            </h2>
            <p className="text-lg text-gray-400">
              {content.process?.subtitle || "A proven methodology that delivers measurable results"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.process?.steps || [
              { number: "01", title: "Analysis", description: "Comprehensive audit of your current performance and market position" },
              { number: "02", title: "Strategy", description: "Develop a customized revenue optimization strategy" },
              { number: "03", title: "Implementation", description: "Execute pricing and distribution strategies across all channels" },
              { number: "04", title: "Optimization", description: "Continuous monitoring and refinement for maximum results" }
            ]).map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-[#4353FF]/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-[#4353FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {content.results?.title || "Proven Results for Dubai Property Owners"}
              </h2>
              <p className="text-xl text-white/80 mb-8">
                {content.results?.description || "Our clients see an average 40% increase in revenue within the first 6 months of working with us."}
              </p>
              <div className="space-y-4">
                {(content.results?.stats || [
                  { value: "40%", label: "Average Revenue Increase" },
                  { value: "95%", label: "Average Occupancy Rate" },
                  { value: "500+", label: "Properties Managed" },
                  { value: "2.5x", label: "Average ROI Improvement" }
                ]).map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-6">Get Your Free Revenue Audit</h3>
              <p className="text-gray-600 mb-6">
                Discover how much more your property could be earning with our comprehensive revenue analysis.
              </p>
              <Link
                to="/contact"
                className="block w-full bg-[#4353FF] text-white text-center px-8 py-4 rounded-full font-medium hover:bg-[#4353FF]/90 transition-colors"
              >
                Request Free Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6">
            Ready to Maximize Your Property's Revenue?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of Dubai property owners who trust CORE to optimize their rental income.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-[#4353FF] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-[#0A0A0A] text-[#0A0A0A] px-8 py-4 rounded-full font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              View Our Pricing
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RevenueManagementPage;
