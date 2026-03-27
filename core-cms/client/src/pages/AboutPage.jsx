import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchPage } from '../lib/api';

const AboutPage = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'about'],
    queryFn: () => fetchPage('about'),
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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#4353FF]/20 text-[#4353FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              About CORE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {content.hero?.title || "Dubai's Leading Holiday Home Management Company"}
            </h1>
            <p className="text-xl text-gray-400">
              {content.hero?.subtitle || "We're on a mission to transform how property owners maximize their rental income while delivering exceptional guest experiences."}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6">
                {content.story?.title || "Our Story"}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {content.story?.paragraph1 || "Founded in 2018, CORE emerged from a simple observation: property owners in Dubai were leaving money on the table while struggling with the day-to-day challenges of managing short-term rentals."}
                </p>
                <p>
                  {content.story?.paragraph2 || "We set out to create a comprehensive solution that combines cutting-edge technology with personalized service, helping property owners maximize their returns while providing guests with unforgettable experiences."}
                </p>
                <p>
                  {content.story?.paragraph3 || "Today, we're proud to manage over 500 properties across Dubai, with a team of 50+ dedicated professionals committed to excellence in every aspect of holiday home management."}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#4353FF] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-white/80">Properties Managed</div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="text-5xl font-bold text-[#4353FF] mb-2">50+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="text-5xl font-bold text-[#4353FF] mb-2">6+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="bg-[#0A0A0A] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">40%</div>
                <div className="text-gray-400">Avg. Revenue Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <div className="w-14 h-14 bg-[#4353FF]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#4353FF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">
                {content.mission?.title || "Our Mission"}
              </h3>
              <p className="text-gray-600">
                {content.mission?.description || "To empower property owners with innovative technology and exceptional service, maximizing their rental income while delivering outstanding guest experiences that set new standards in the holiday home industry."}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <div className="w-14 h-14 bg-[#4353FF]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#4353FF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">
                {content.vision?.title || "Our Vision"}
              </h3>
              <p className="text-gray-600">
                {content.vision?.description || "To become the most trusted and innovative holiday home management company in the Middle East, recognized for transforming property investments into highly profitable, hassle-free ventures for owners worldwide."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              {content.values?.title || "Our Core Values"}
            </h2>
            <p className="text-lg text-gray-600">
              {content.values?.subtitle || "The principles that guide everything we do"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.values?.items || [
              { icon: "Award", title: "Excellence", description: "We strive for excellence in every interaction, every service, and every outcome." },
              { icon: "Users", title: "Partnership", description: "We treat every property as our own and every owner as a valued partner." },
              { icon: "TrendingUp", title: "Innovation", description: "We continuously evolve our technology and services to stay ahead of the market." },
              { icon: "Target", title: "Integrity", description: "We operate with transparency, honesty, and the highest ethical standards." }
            ]).map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#4353FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-[#4353FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.team?.title || "Meet Our Leadership Team"}
            </h2>
            <p className="text-lg text-gray-400">
              {content.team?.subtitle || "Experienced professionals dedicated to your success"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.team?.members || [
              { name: "Ahmed Al-Rashid", role: "Founder & CEO", image: null },
              { name: "Sarah Mitchell", role: "Chief Operating Officer", image: null },
              { name: "Khalid Hassan", role: "Head of Revenue Management", image: null },
              { name: "Maria Santos", role: "Director of Operations", image: null },
              { name: "James Wilson", role: "Head of Technology", image: null },
              { name: "Fatima Al-Zahra", role: "Customer Success Director", image: null }
            ]).map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-[#4353FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-[#4353FF]" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4353FF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Partner with CORE?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of property owners who trust us to maximize their rental income.
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

export default AboutPage;
