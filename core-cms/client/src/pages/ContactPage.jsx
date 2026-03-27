import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchPage, submitContactForm } from '../lib/api';

const ContactPage = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'contact'],
    queryFn: () => fetchPage('contact'),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', propertyType: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              <Mail className="w-4 h-4" />
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {content.hero?.title || "Get in Touch"}
            </h1>
            <p className="text-xl text-gray-400">
              {content.hero?.subtitle || "Ready to maximize your property's potential? We'd love to hear from you."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">
                {content.info?.title || "Let's Start a Conversation"}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {content.info?.description || "Whether you're a property owner looking to maximize your rental income or a guest seeking the perfect holiday home, we're here to help."}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Phone</h3>
                    <p className="text-gray-600">{content.info?.phone || "+971 4 123 4567"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Email</h3>
                    <p className="text-gray-600">{content.info?.email || "hello@core-holidayhomes.com"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Address</h3>
                    <p className="text-gray-600">{content.info?.address || "Downtown Dubai, Business Bay, Dubai, UAE"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Business Hours</h3>
                    <p className="text-gray-600">{content.info?.hours || "Sunday - Thursday: 9:00 AM - 6:00 PM"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#4353FF] font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-6">
                    {content.form?.title || "Send Us a Message"}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                          placeholder="+971 XX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                      >
                        <option value="">Select property type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your property and how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#4353FF] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#4353FF] mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-400">Downtown Dubai, Business Bay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4353FF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Schedule a free consultation and discover how much your property could be earning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+971412345678"
              className="bg-white text-[#4353FF] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
